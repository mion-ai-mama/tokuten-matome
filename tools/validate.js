#!/usr/bin/env node
/* ============================================================
   特典データの検査

   js/presents.js の中身が、表示を壊さない形になっているかを確かめます。
   特典を追加したあとに実行してください。CIでも同じ検査が走ります。

     node tools/validate.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CATEGORIES = ["ChatGPT・AI活用", "画像・動画づくり", "AIで副業・在宅ワーク"];
const TYPES = ["page", "note", "prompt"];
const TYPE_ORDER = { page: 0, note: 1, prompt: 2 };

function loadPresents() {
  const src = fs.readFileSync(path.join(ROOT, "js", "presents.js"), "utf8");
  return new Function(`${src}; return PRESENTS;`)();
}

const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function checkItem(item, index, seenIds) {
  const where = `${index + 1}件目（id: ${item.id || "未設定"}）`;

  check(item.id, `${where}: id がありません`);
  check(!seenIds.has(item.id), `${where}: id が重複しています`);
  seenIds.add(item.id);

  check(TYPES.indexOf(item.type) !== -1, `${where}: type が不正です（${item.type}）`);
  check(
    CATEGORIES.indexOf(item.category) !== -1,
    `${where}: カテゴリーが定義外です（${item.category}）`,
  );
  check(item.title, `${where}: title がありません`);
  check(item.plainTitle, `${where}: plainTitle がありません`);
  check(item.description, `${where}: description がありません`);
  check(Array.isArray(item.tags) && item.tags.length > 0, `${where}: tags がありません`);

  if (item.type === "page" || item.type === "note") {
    check(item.url, `${where}: ${item.type} には url が必要です`);
  }
  if (item.type === "prompt") {
    check(item.prompt, `${where}: prompt には本文が必要です`);
  }

  check(item.image, `${where}: image がありません`);
  if (item.image) {
    check(
      fs.existsSync(path.join(ROOT, item.image)),
      `${where}: 画像が見つかりません（${item.image}）`,
    );
  }
}

function checkOrder(list) {
  // 種別グループ順（page → note → prompt）が崩れていないか
  let previous = -1;
  list.forEach(function (item, i) {
    const rank = TYPE_ORDER[item.type];
    check(
      rank >= previous,
      `${i + 1}件目（${item.id}）: 種別の並び順が崩れています。page → note → prompt の順に並べてください`,
    );
    if (rank > previous) previous = rank;
  });

  // number は「古いものほど小さい」通し番号。新しい特典ほど大きな番号になる。
  // 各グループは新着順に並ぶので、上から下へ番号が減っていくのが正しい状態。
  const seenNumbers = new Set();
  list.forEach(function (item, i) {
    check(
      /^\d{2,}$/.test(item.number || ""),
      `${i + 1}件目（${item.id}）: number は2桁以上の数字にしてください（${item.number}）`,
    );
    check(
      !seenNumbers.has(item.number),
      `${i + 1}件目（${item.id}）: number ${item.number} が重複しています`,
    );
    seenNumbers.add(item.number);
  });

  let lastType = null;
  let lastNumber = Infinity;
  list.forEach(function (item, i) {
    if (item.type !== lastType) {
      lastType = item.type;
      lastNumber = Infinity;
    }
    const current = Number(item.number);
    check(
      current < lastNumber,
      `${i + 1}件目（${item.id}）: number ${item.number} の位置がおかしいです。` +
        "各グループは新しい順（番号が大きい順）に並べてください",
    );
    lastNumber = current;
  });
}

function main() {
  const list = loadPresents();
  const seenIds = new Set();
  list.forEach(function (item, i) {
    checkItem(item, i, seenIds);
  });
  checkOrder(list);

  const byType = {};
  const byCategory = {};
  list.forEach(function (item) {
    byType[item.type] = (byType[item.type] || 0) + 1;
    byCategory[item.category] = (byCategory[item.category] || 0) + 1;
  });

  console.log(`掲載件数: ${list.length}件`);
  console.log(`種別:     ${JSON.stringify(byType)}`);
  console.log(`カテゴリー: ${JSON.stringify(byCategory)}`);

  if (errors.length > 0) {
    console.error(`\n❌ ${errors.length}件の問題が見つかりました:\n`);
    errors.forEach(function (message) {
      console.error(`  - ${message}`);
    });
    process.exit(1);
  }
  console.log("\n✅ 検査に全て通りました。");
}

main();
