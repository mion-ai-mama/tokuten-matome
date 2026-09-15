/* ============================================================
   特典まとめページ — 絞り込み・検索・コピー機能

   表示するデータは js/presents.js の PRESENTS が唯一の源です。
   このファイルを編集して特典を足すことはありません。

   セキュリティ方針: PRESENTS の値と検索語は、必ず textContent か
   createElement 経由でDOMに入れます（innerHTML への生値挿入は禁止）。
   ============================================================ */

(function () {
  "use strict";

  const CATEGORIES = ["ChatGPT・AI活用", "画像・動画づくり", "AIで副業・在宅ワーク"];
  const ALL = "すべて";

  const TYPE_BADGE = {
    page: "🎁 特典ページ",
    note: "📝 note",
    prompt: "📋 プロンプト",
  };

  const NOTE_NOTICE = "こちらの特典は外部サイト note に遷移します";

  const el = {
    cards: document.getElementById("cards"),
    tabs: document.getElementById("tabs"),
    search: document.getElementById("search"),
    status: document.getElementById("status"),
    total: document.getElementById("total-count"),
  };

  const state = { category: ALL, keyword: "" };

  /* ---------- 小さな道具 ---------- */

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // title の <br> だけを改行として活かす。文字列は textContent で入れるので安全。
  function appendTitle(target, title) {
    String(title)
      .split(/<br\s*\/?>/i)
      .forEach(function (part, i) {
        if (i > 0) target.appendChild(document.createElement("br"));
        target.appendChild(document.createTextNode(part));
      });
  }

  function matches(item) {
    if (state.category !== ALL && item.category !== state.category) return false;
    if (!state.keyword) return true;
    const haystack = [item.plainTitle, item.description, item.tags.join(" ")]
      .join(" ")
      .toLowerCase();
    return haystack.indexOf(state.keyword) !== -1;
  }

  function countFor(category) {
    return PRESENTS.filter(function (item) {
      return category === ALL || item.category === category;
    }).length;
  }

  /* ---------- カードの中身 ---------- */

  function buildBody(item) {
    const body = make("div", "card__body");

    const meta = make("div", "card__meta");
    meta.appendChild(make("span", "card__num", item.number));
    meta.appendChild(make("span", "card__category", item.category));
    meta.appendChild(make("span", "card__badge", TYPE_BADGE[item.type] || ""));
    body.appendChild(meta);

    const title = make("h3", "card__title");
    appendTitle(title, item.title);
    body.appendChild(title);

    body.appendChild(make("p", "card__desc", item.description));

    const tags = make("ul", "card__tags");
    item.tags.forEach(function (tag) {
      tags.appendChild(make("li", null, "#" + tag));
    });
    body.appendChild(tags);

    // note型だけ、タップ前に気づける位置へ外部遷移の注釈を出す
    if (item.type === "note") {
      body.appendChild(make("p", "card__notice", NOTE_NOTICE));
    }
    return body;
  }

  function buildThumb(item) {
    const img = make("img", "card__thumb");
    img.src = item.image;
    img.alt = item.plainTitle;
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }

  /* ---------- プロンプト型（ページ内で開く） ---------- */

  function copyText(text, button) {
    const original = button.textContent;

    function flash(label) {
      button.textContent = label;
      button.classList.add("is-copied");
      setTimeout(function () {
        button.textContent = original;
        button.classList.remove("is-copied");
      }, 2200);
    }

    function done() {
      flash("✅ コピーしました");
    }

    // コピーできなかったときは、黙らずに手動コピーを促す
    function fail() {
      flash("⚠️ 上の枠から手動でコピーしてください");
    }
    // file:// で開いたときなど、clipboard APIが使えない場合の代替手段
    function fallback() {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(area);
      if (ok) {
        done();
      } else {
        fail();
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      // 失敗しても黙って終わらせない（利用者が成否を判断できなくなるため）
      navigator.clipboard.writeText(text).then(done, fallback);
      return;
    }
    fallback();
  }

  function buildPromptPanel(item) {
    const panel = make("div", "card__prompt");
    panel.hidden = true;

    if (item.note) panel.appendChild(make("p", "card__prompt-note", item.note));

    const pre = make("pre", null, item.prompt);
    panel.appendChild(pre);

    const copy = make("button", "copy-btn", "📋 プロンプトをコピー");
    copy.type = "button";
    copy.addEventListener("click", function () {
      copyText(item.prompt, copy);
    });
    panel.appendChild(copy);
    return panel;
  }

  /* ---------- カード1枚 ---------- */

  function buildCard(item) {
    const li = make("li", "card");

    if (item.type === "prompt") {
      const panel = buildPromptPanel(item);
      const opener = make("button", "card__link");
      opener.type = "button";
      opener.setAttribute("aria-expanded", "false");
      opener.appendChild(buildThumb(item));
      opener.appendChild(buildBody(item));
      opener.addEventListener("click", function () {
        panel.hidden = !panel.hidden;
        opener.setAttribute("aria-expanded", String(!panel.hidden));
      });
      li.appendChild(opener);
      li.appendChild(panel);
      return li;
    }

    const link = make("a", "card__link");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.appendChild(buildThumb(item));
    link.appendChild(buildBody(item));
    li.appendChild(link);
    return li;
  }

  /* ---------- 0件のとき ---------- */

  function buildEmpty() {
    const li = make("li", "empty");
    li.appendChild(make("p", "empty__title", "条件に合う特典が見つかりませんでした"));
    li.appendChild(
      make(
        "p",
        "empty__text",
        "キーワードを短くするか、カテゴリーを「すべて」に戻してお試しください。",
      ),
    );
    return li;
  }

  /* ---------- 描画 ---------- */

  function render() {
    const shown = PRESENTS.filter(matches);
    el.cards.textContent = "";

    if (shown.length === 0) {
      el.cards.appendChild(buildEmpty());
      el.status.textContent = "0件";
      return;
    }
    const fragment = document.createDocumentFragment();
    shown.forEach(function (item) {
      fragment.appendChild(buildCard(item));
    });
    el.cards.appendChild(fragment);
    el.status.textContent = shown.length + "件を表示中";
  }

  function buildTabs() {
    [ALL].concat(CATEGORIES).forEach(function (category) {
      const tab = make("button", "tab");
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", String(category === state.category));
      tab.appendChild(document.createTextNode(category));
      tab.appendChild(make("span", "tab__count", "(" + countFor(category) + ")"));
      tab.addEventListener("click", function () {
        state.category = category;
        Array.prototype.forEach.call(el.tabs.children, function (other) {
          other.setAttribute("aria-selected", String(other === tab));
        });
        render();
      });
      el.tabs.appendChild(tab);
    });
  }

  /* ---------- 起動 ---------- */

  el.total.textContent = String(PRESENTS.length);
  buildTabs();
  render();

  el.search.addEventListener("input", function () {
    state.keyword = el.search.value.trim().toLowerCase();
    render();
  });
})();
