#!/usr/bin/env node
/* ============================================================
   サムネイル自動生成スクリプト

   特典ページに固有のヒーロー画像が無いものについて、
   presents.js のタイトル・説明文からサムネイル画像を作ります。
   ヘッドレスChromeでHTMLを描画して書き出すだけなので、
   外部サービス・APIキー・費用は一切かかりません。

   ⚠️ 対象は presents.js で thumbAuto: true が付いている特典だけです。
   実写のヒーロー画像・noteのアイキャッチを使っている特典は、
   誤って上書きしないよう、このスクリプトでは生成できません。

   使い方:
     node tools/gen-thumb.js <id>      … 指定した1件を生成
     node tools/gen-thumb.js --missing … 画像が無いものだけ生成
     node tools/gen-thumb.js --regen   … 自動生成ぶんを作り直す
   ============================================================ */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const THUMB_DIR = path.join(ROOT, "assets", "thumbs");
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// presents.js を読み込む（ブラウザ用ファイルをNodeで評価する）
function loadPresents() {
  const src = fs.readFileSync(path.join(ROOT, "js", "presents.js"), "utf8");
  return new Function(`${src}; return PRESENTS;`)();
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

// タイトルの <br> だけは改行として活かし、それ以外はエスケープする
function titleToHtml(title) {
  return String(title)
    .split(/<br\s*\/?>/i)
    .map(escapeHtml)
    .join("<br>");
}

const TYPE_LABEL = {
  page: "🎁 特典ページ",
  note: "📝 note",
  prompt: "📋 プロンプト",
};

function buildHtml(item) {
  const tags = item.tags
    .map((t) => `<span class="tag">#${escapeHtml(t)}</span>`)
    .join("");
  // thumbArt がある特典は、右側にその画像を並べた横長サムネにする
  // （正方形の表紙画像などを、切らずに16:9へ収めるため）
  // 一時フォルダで描画するため、画像は絶対パスで指定する
  const artPath = item.thumbArt ? path.join(ROOT, item.thumbArt) : null;
  const art = artPath
    ? `<div class="art"><img src="file://${escapeHtml(artPath)}" alt=""></div>`
    : "";
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 800px; height: 450px; display: flex; overflow: hidden;
    font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif;
    background: linear-gradient(140deg, #fffdfb 0%, #fdf5f2 55%, #fbeeec 100%);
    color: #3d322f;
  }
  .accent { width: 18px; flex-shrink: 0;
    background: linear-gradient(180deg, #cf8a92 0%, #e2a9ad 60%, #f7dfe0 100%); }
  .inner { flex: 1; min-width: 0; padding: 38px 48px; display: flex; flex-direction: column; }
  .inner.has-art { padding: 34px 28px 34px 44px; }
  .art { width: 312px; flex-shrink: 0; align-self: stretch;
    background: #fbeeec; border-left: 1px solid #f0dfdc; }
  .art img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .has-art h1 { font-size: 32px; margin-top: 16px; }
  .has-art .desc { font-size: 16px; -webkit-line-clamp: 2; }
  /* 幅が狭くなるぶん、上段が折り返さないように詰める */
  .has-art .top { gap: 10px; }
  .has-art .num { font-size: 27px; }
  .has-art .pill { font-size: 14px; padding: 5px 12px; white-space: nowrap; }
  .has-art .type { display: none; }
  .has-art .tags { gap: 8px; flex-wrap: nowrap; }
  .has-art .tag { font-size: 13px; padding: 4px 10px; white-space: nowrap; }
  .has-art .who { font-size: 14px; padding-left: 10px; }
  .top { display: flex; align-items: center; gap: 16px; }
  .num { font-size: 34px; font-weight: 800; color: #e6c2c4; letter-spacing: 1px; line-height: 1; }
  .pill { font-size: 17px; font-weight: 700; color: #b16d76;
    background: #fbeeec; border: 1px solid #f0dfdc; border-radius: 999px; padding: 6px 17px; }
  .type { margin-left: auto; font-size: 16px; font-weight: 700; color: #8a7972; }
  h1 { margin-top: 20px; font-size: 38px; font-weight: 800; line-height: 1.38;
    letter-spacing: 0.5px; }
  h1 .mark { background: linear-gradient(transparent 62%, #f7dfe0 62%); padding: 0 2px; }
  .desc { margin-top: 16px; font-size: 18px; line-height: 1.75; color: #6f5f59;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .bottom { margin-top: auto; display: flex; align-items: flex-end; }
  .tags { display: flex; gap: 10px; flex-wrap: wrap; }
  .tag { font-size: 15px; font-weight: 600; color: #b16d76;
    background: #fff; border: 1px solid #f0dfdc; border-radius: 8px; padding: 5px 12px; }
  .who { margin-left: auto; font-size: 16px; font-weight: 700; color: #a9948d;
    white-space: nowrap; padding-left: 16px; }
</style></head><body>
  <div class="accent"></div>
  <div class="inner${item.thumbArt ? " has-art" : ""}">
    <div class="top">
      <div class="num">${escapeHtml(item.number)}</div>
      <div class="pill">${escapeHtml(item.category)}</div>
      <div class="type">${TYPE_LABEL[item.type] || ""}</div>
    </div>
    <h1><span class="mark">${titleToHtml(item.title)}</span></h1>
    <p class="desc">${escapeHtml(item.description)}</p>
    <div class="bottom">
      <div class="tags">${tags}</div>
      <div class="who">@mion.ai.mama</div>
    </div>
  </div>
  ${art}
</body></html>`;
}

function renderOne(item) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "thumb-"));
  const htmlPath = path.join(tmp, "t.html");
  const pngPath = path.join(tmp, "t.png");
  fs.writeFileSync(htmlPath, buildHtml(item), "utf8");

  execFileSync(CHROME, [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=800,450",
    `--screenshot=${pngPath}`,
    `file://${htmlPath}`,
  ], { stdio: "ignore" });

  const out = path.join(THUMB_DIR, `${item.id}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "78",
    pngPath, "--out", out], { stdio: "ignore" });
  fs.rmSync(tmp, { recursive: true, force: true });
  return out;
}

function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("使い方: node tools/gen-thumb.js <id> | --missing | --regen");
    process.exit(1);
  }
  if (!fs.existsSync(CHROME)) {
    console.error(`Google Chrome が見つかりません: ${CHROME}`);
    process.exit(1);
  }
  fs.mkdirSync(THUMB_DIR, { recursive: true });

  // thumbAuto が付いたものだけが生成対象。実写画像を誤って壊さないための歯止め。
  const all = loadPresents().filter((p) => p.thumbAuto === true);
  let targets;
  if (arg === "--regen") {
    targets = all;
  } else if (arg === "--missing") {
    targets = all.filter((p) => !fs.existsSync(path.join(ROOT, p.image)));
  } else {
    targets = all.filter((p) => p.id === arg);
    if (targets.length === 0) {
      console.error(`自動生成の対象ではありません: ${arg}`);
      console.error("（実写画像を使う特典です。差し替えるなら画像を直接置いてください）");
      process.exit(1);
    }
  }

  if (targets.length === 0) {
    console.log("生成が必要なサムネイルはありません。");
    return;
  }
  targets.forEach((item) => {
    if (item.thumbArt && !fs.existsSync(path.join(ROOT, item.thumbArt))) {
      console.error(`thumbArt の画像が見つかりません: ${item.thumbArt}（${item.id}）`);
      process.exit(1);
    }
    const out = renderOne(item);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`  ${path.basename(out)}  ${kb}KB`);
  });
  console.log(`\n${targets.length}枚を生成しました。`);
}

main();
