#!/usr/bin/env node
/* ============================================================
   画像パスに版番号を刻む

   ブラウザは一度読んだ画像をしばらく覚えているため、同じファイル名のまま
   差し替えても、古い画像が表示され続けることがある（GitHub Pagesは最大10分）。

   そこで、画像の中身から計算した短い文字列を `?v=` として付ける。
   中身が変われば文字列も変わるので、ブラウザは新しい画像として読み直す。
   中身が変わっていなければ文字列も変わらず、無駄な読み直しは起きない。

   画像を差し替えたら、コミット前にこれを実行する:
     node tools/stamp-images.js
   ============================================================ */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const PRESENTS_PATH = path.join(ROOT, "js", "presents.js");

// "assets/thumbs/foo.jpg?v=abc123" → "assets/thumbs/foo.jpg"
function stripVersion(imagePath) {
  return String(imagePath).split("?")[0];
}

function hashOf(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 8);
}

function main() {
  let source = fs.readFileSync(PRESENTS_PATH, "utf8");
  const presents = new Function(`${source}; return PRESENTS;`)();

  let changed = 0;
  let missing = 0;

  presents.forEach(function (item) {
    const bare = stripVersion(item.image);
    const filePath = path.join(ROOT, bare);
    if (!fs.existsSync(filePath)) {
      console.error(`画像が見つかりません: ${bare}（${item.id}）`);
      missing += 1;
      return;
    }
    const stamped = `${bare}?v=${hashOf(filePath)}`;
    if (stamped === item.image) return;

    // その特典の image 行だけを差し替える
    const escapedId = item.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      `(id: "${escapedId}",[\\s\\S]*?image: ")[^"]*(")`,
    );
    const before = source;
    source = source.replace(pattern, `$1${stamped}$2`);
    if (source === before) {
      console.error(`書き換えできませんでした: ${item.id}`);
      missing += 1;
      return;
    }
    console.log(`  ${item.number} ${bare} → ?v=${stamped.split("=")[1]}`);
    changed += 1;
  });

  if (missing > 0) {
    console.error(`\n❌ ${missing}件の画像を処理できませんでした。`);
    process.exit(1);
  }

  if (changed === 0) {
    console.log("すべて最新です。書き換えは不要でした。");
    return;
  }
  fs.writeFileSync(PRESENTS_PATH, source);
  console.log(`\n✅ ${changed}件の版番号を更新しました。`);
}

main();
