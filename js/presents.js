/* ============================================================
   特典データ（このページの唯一の真実の源）

   ここに1件追記すれば、カード・カテゴリー別件数・総件数が
   すべて自動で更新されます。index.html を手で編集する必要は
   ありません（編集すると二重管理になり必ずズレます）。

   ▼ 並び順のルール（重要）
     ① type:"page"   … 特典ページ  新着順   ← 一番上
     ② type:"note"   … note記事    新着順
     ③ type:"prompt" … プロンプト           ← 一番下
     配列のこの並びが、そのまま画面の表示順になります。
     新しい特典は「配列の先頭」ではなく
     「その種別グループの先頭」に入れてください。

   ▼ カテゴリーは次の3つだけ（増やさない）
     ChatGPT・AI活用 / 画像・動画づくり / AIで副業・在宅ワーク
   ============================================================ */

const NOTE_BASE = "https://note.com/brisk_ibis4395/n/";

const PRESENTS = [
  // ============================================================
  // ① 特典ページ型（GitHub Pages）… 新着順
  // ============================================================
  {
    id: "chatgpt-illustration-tokuten",
    number: "26",
    type: "page",
    category: "画像・動画づくり",
    title: "写真から仕事に使える<br>デザインへ",
    plainTitle: "写真から仕事に使えるデザインへ｜ChatGPTイラスト活用プロンプト集",
    description:
      "写真を4つのテイストのイラストに変換し、ポスターやフライヤー、ブログ素材まで展開できるプロンプト集です。",
    tags: ["画像生成", "プロンプト集", "ChatGPT"],
    url: "https://mion-ai-mama.github.io/chatgpt-illustration-tokuten/",
    image: "assets/thumbs/chatgpt-illustration-tokuten.jpg",
  },
  {
    id: "chatgpt-sites-tokuten",
    number: "25",
    type: "page",
    category: "AIで副業・在宅ワーク",
    title: "ChatGPTで<br>ホームページを作る方法",
    plainTitle: "ChatGPTでホームページを作る方法｜コピペで使える初心者ガイド",
    description:
      "コードを書かなくても自分だけのホームページが作れます。コピペで使えるプロンプト付きの実践ガイドです。",
    tags: ["ホームページ", "ノーコード", "初心者向け"],
    url: "https://mion-ai-mama.github.io/chatgpt-sites-tokuten/",
    image: "assets/thumbs/chatgpt-sites-tokuten.jpg",
  },
  {
    id: "chatgpt-true-self-tokuten",
    number: "24",
    type: "page",
    category: "ChatGPT・AI活用",
    title: "「本当の自分」を深掘りする<br>5つの質問",
    plainTitle: "ChatGPTで「本当の自分」を深掘りする5つの質問",
    description:
      "自分でも気づいていない本音や思考のクセを、ChatGPTと一緒に整理していく自己分析ガイドです。",
    tags: ["自己分析", "質問集", "ChatGPT"],
    url: "https://mion-ai-mama.github.io/chatgpt-true-self-tokuten/",
    image: "assets/thumbs/chatgpt-true-self-tokuten.jpg",
  },
  {
    id: "chatgpt-5-keywords-tokuten",
    number: "23",
    type: "page",
    category: "ChatGPT・AI活用",
    title: "長文がパッとわかる<br>5つの魔法の合い言葉",
    plainTitle: "ChatGPTの長文がパッとわかる！5つの魔法の合い言葉",
    description:
      "長い回答を漫画・図解・手書きノート・付箋・比較表に変える5つの合い言葉と、その設定方法を紹介します。",
    tags: ["時短", "図解", "ChatGPT"],
    url: "https://mion-ai-mama.github.io/chatgpt-5-keywords-tokuten/",
    image: "assets/thumbs/chatgpt-5-keywords-tokuten.jpg",
  },
  {
    id: "gemini-prompt-5-tokuten",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "22",
    type: "page",
    category: "ChatGPT・AI活用",
    title: "Geminiの回答が変わる<br>コピペ用プロンプト5選",
    plainTitle: "Geminiの回答レベルを劇的に変える｜コピペ用プロンプト5選",
    description:
      "Gemini・ChatGPT・Claudeでそのまま使えるプロンプト5選。ボタンひとつで簡単にコピーできます。",
    tags: ["Gemini", "プロンプト集", "コピペOK"],
    url: "https://mion-ai-mama.github.io/gemini-prompt-5-tokuten/",
    image: "assets/thumbs/gemini-prompt-5-tokuten.jpg",
  },
  {
    id: "instagram-tokuten-template",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "21",
    type: "page",
    category: "ChatGPT・AI活用",
    title: "AIで人気動画を分析する<br>3STEPガイド",
    plainTitle: "AIで人気動画を分析する方法｜コピペで使える3STEPガイド",
    description:
      "人気動画をChatGPTに見せるだけで「なぜ伸びたのか」「次の企画」が分かる3STEPガイドです。",
    tags: ["リール分析", "企画づくり", "ChatGPT"],
    url: "https://mion-ai-mama.github.io/instagram-tokuten-template/",
    image: "assets/thumbs/instagram-tokuten-template.jpg",
  },
  {
    id: "linkedin-remote-work-guide",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "20",
    type: "page",
    category: "AIで副業・在宅ワーク",
    title: "AIを味方に探す<br>海外在宅ワーク入門",
    plainTitle: "AIを味方に探す｜海外在宅ワーク完全スタートガイド",
    description:
      "LinkedInで海外の在宅ワークを探す方法から、求人の見極め・応募準備・Claude活用まで解説します。",
    tags: ["海外在宅", "LinkedIn", "Claude"],
    url: "https://mion-ai-mama.github.io/linkedin-remote-work-guide/",
    image: "assets/thumbs/linkedin-remote-work-guide.jpg",
  },
  {
    id: "claude-chat-cowork-code-guide",
    // 元ページのOGPがClaudeブランドのブルーで、一覧の配色から浮くため自動生成にする
    thumbAuto: true,
    number: "19",
    type: "page",
    category: "ChatGPT・AI活用",
    title: "Claude Chat・Cowork・Code<br>使い分けガイド",
    plainTitle: "Claude Chat・Cowork・Code｜在宅ワーク使い分け完全ガイド",
    description:
      "Claudeの「考える・任せる・自動化する」を初心者向けに解説。今日から使えるプロンプト付きです。",
    tags: ["Claude", "使い分け", "初心者向け"],
    url: "https://mion-ai-mama.github.io/claude-chat-cowork-code-guide/",
    image: "assets/thumbs/claude-chat-cowork-code-guide.jpg",
  },
  {
    id: "line-emoji-ai-guide",
    number: "18",
    type: "page",
    category: "画像・動画づくり",
    title: "AIでLINE絵文字を作って<br>販売するガイド",
    plainTitle: "絵心ゼロでもOK！AIでLINE絵文字を作って販売する完全ガイド",
    description:
      "スマホで絵文字8種類を作り、Canvaで整えて、LINE Creators Marketへ販売申請するまで進めます。",
    tags: ["LINE絵文字", "販売", "Canva"],
    url: "https://mion-ai-mama.github.io/line-emoji-ai-guide/",
    image: "assets/thumbs/line-emoji-ai-guide.jpg",
  },
  {
    id: "canva-ai-photo-to-video-guide",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "17",
    type: "page",
    category: "画像・動画づくり",
    title: "写真1枚でリール動画素材<br>Canva AI活用ガイド",
    plainTitle: "Canva AI 写真→動画 完全ガイド｜写真1枚でリール動画素材を作る方法",
    description:
      "写真1枚からCanva AIでリール用の動画素材を作る方法を解説。コピペで使えるカスタム指示集つき。",
    tags: ["Canva", "動画素材", "リール"],
    url: "https://mion-ai-mama.github.io/canva-ai-photo-to-video-guide/",
    image: "assets/thumbs/canva-ai-photo-to-video-guide.jpg",
  },
  {
    id: "ai-note-writing-guide",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "16",
    type: "page",
    category: "AIで副業・在宅ワーク",
    title: "AIで海外記事をヒントに<br>noteを書く方法",
    plainTitle: "AIで海外記事をヒントにnoteを書く方法｜おすすめSubstackとプロンプト付き",
    description:
      "参考にしているSubstackと、海外記事をnoteに仕上げるまでの手順をまとめた実践ガイドです。",
    tags: ["note", "執筆", "Substack"],
    url: "https://mion-ai-mama.github.io/ai-note-writing-guide/",
    image: "assets/thumbs/ai-note-writing-guide.jpg",
  },
  {
    id: "ai-ehon-debut-guide",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    // 元画像が正方形の絵本表紙のため、16:9に切ると文字が欠ける。
    // タイトルの横に表紙を並べる形で生成する。
    thumbArt: "assets/thumb-src/ai-ehon-cover.jpg",
    number: "15",
    type: "page",
    category: "AIで副業・在宅ワーク",
    title: "AI絵本デビュー<br>完全ガイド",
    plainTitle: "AI絵本デビュー完全ガイド｜絵心も文才もいらない絵本づくり3STEP",
    description:
      "ChatGPTと画像生成AI、Canva、Amazon KDPを使って絵本づくりに挑戦できる完全ガイドです。",
    tags: ["AI絵本", "KDP", "3STEP"],
    url: "https://mion-ai-mama.github.io/ai-ehon-debut-guide/",
    image: "assets/thumbs/ai-ehon-debut-guide.jpg",
  },
  {
    id: "line-sticker-ai-guide",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "14",
    type: "page",
    category: "画像・動画づくり",
    title: "AIでLINEスタンプを作って<br>販売するガイド",
    plainTitle: "絵心ゼロでもスマホで完成！AIでLINEスタンプを作って販売する完全ガイド",
    description:
      "キャラクター作りから販売申請まで、スマホ中心で進められる初心者向けの6ステップガイドです。",
    tags: ["LINEスタンプ", "販売", "6STEP"],
    url: "https://mion-ai-mama.github.io/line-sticker-ai-guide/",
    image: "assets/thumbs/line-sticker-ai-guide.jpg",
  },
  {
    id: "chatgpt-10-codes-tokuten",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "13",
    type: "page",
    category: "ChatGPT・AI活用",
    title: "在宅ワークで差がつく<br>ChatGPT最強コード10選",
    plainTitle: "在宅ワークで差がつく｜ChatGPT最強コード10選",
    description:
      "応募文、クライアント対応、タスク整理まで。コピペするだけで使える実践プロンプト10選です。",
    tags: ["プロンプト集", "在宅ワーク", "コピペOK"],
    url: "https://mion-ai-mama.github.io/chatgpt-10-codes-tokuten/",
    image: "assets/thumbs/chatgpt-10-codes-tokuten.jpg",
  },

  // ============================================================
  // ② note型 … 新着順（カードに外部遷移の注釈が自動で付きます）
  // ============================================================
  {
    id: "note-ouchiwork-guide",
    number: "12",
    type: "note",
    category: "AIで副業・在宅ワーク",
    title: "【保存版】初心者向け<br>おうちワーク完全ガイド",
    plainTitle: "【保存版】初心者向け おうちワーク完全ガイド",
    description:
      "在宅ワークをこれから始める方へ。仕事の種類から探し方まで、最初の一歩をまとめた保存版ガイドです。",
    tags: ["在宅ワーク", "保存版", "初心者向け"],
    url: NOTE_BASE + "n18fbedb3896c",
    image: "assets/thumbs/note-ouchiwork-guide.jpg",
  },
  {
    id: "note-ai-pet-brand",
    number: "11",
    type: "note",
    category: "画像・動画づくり",
    title: "在庫ゼロで始める<br>AI×ペットブランド",
    plainTitle: "在庫ゼロで始める！AI×オリジナルペットブランド完全ガイド",
    description:
      "在庫を持たずにオリジナルのペットグッズブランドを立ち上げる方法を、AI活用の手順とあわせて解説します。",
    tags: ["画像生成", "オリジナル商品", "在庫ゼロ"],
    url: NOTE_BASE + "n938991e580c7",
    image: "assets/thumbs/note-ai-pet-brand.jpg",
  },
  {
    id: "note-chatgpt-googlemap",
    number: "10",
    type: "note",
    category: "AIで副業・在宅ワーク",
    title: "ChatGPT×Googleマップ<br>だけでここまでできる！",
    plainTitle: "ChatGPT×Googleマップだけでここまでできる！",
    description:
      "ChatGPTとGoogleマップの組み合わせだけで、リサーチや情報整理がどこまでできるのかを実例で紹介します。",
    tags: ["リサーチ", "Googleマップ", "ChatGPT"],
    url: NOTE_BASE + "n3700b67c2530",
    image: "assets/thumbs/note-chatgpt-googlemap.jpg",
  },
  {
    id: "note-chatgpt-note-writing",
    number: "09",
    type: "note",
    category: "AIで副業・在宅ワーク",
    title: "ChatGPTで読まれる<br>note記事を作る方法",
    plainTitle: "ChatGPTで読まれるnote記事を作る完全ガイド",
    description:
      "テーマ決めから構成、書き出しまで。ChatGPTを使って最後まで読まれるnote記事を作る手順をまとめました。",
    tags: ["note", "執筆", "ChatGPT"],
    url: NOTE_BASE + "n5fadbf84fbe7",
    image: "assets/thumbs/note-chatgpt-note-writing.jpg",
  },
  {
    id: "note-digital-sticker",
    number: "08",
    type: "note",
    category: "画像・動画づくり",
    title: "ChatGPTで作る<br>海外向けデジタルステッカー",
    plainTitle: "ChatGPTで作る 海外向けデジタルステッカー完全ガイド",
    description:
      "海外で人気のデジタルステッカーをChatGPTで作る方法を、デザインから出品準備まで解説します。",
    tags: ["画像生成", "海外販売", "ステッカー"],
    url: NOTE_BASE + "nb534fb39cbb9",
    image: "assets/thumbs/note-digital-sticker.jpg",
  },
  {
    id: "note-nihongo-zaitaku",
    number: "07",
    type: "note",
    category: "AIで副業・在宅ワーク",
    title: "日本語を活かせる<br>在宅ワーク3選",
    plainTitle: "日本語を活かせる在宅ワーク3選",
    description:
      "特別なスキルがなくても、日本語が話せることを強みにできる在宅ワークを3つ紹介します。",
    tags: ["在宅ワーク", "日本語", "3選"],
    url: NOTE_BASE + "nc1dec6493fd8",
    image: "assets/thumbs/note-nihongo-zaitaku.jpg",
  },
  {
    id: "note-ai-pinterest",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "06",
    type: "note",
    category: "AIで副業・在宅ワーク",
    title: "AIが代わりに働く仕組み<br>AI×Pinterest入門",
    plainTitle:
      "AIがあなたの代わりに働く仕組みの作り方 〜初心者ママでもできる AI×Pinterest入門ガイド〜",
    description:
      "Pinterestを使って、AIが代わりに動いてくれる仕組みを作る方法を初心者ママ向けに解説します。",
    tags: ["Pinterest", "自動化", "初心者向け"],
    url: NOTE_BASE + "nf46c6e746b83",
    image: "assets/thumbs/note-ai-pinterest.jpg",
  },
  {
    id: "note-wafu-design",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "05",
    type: "note",
    category: "画像・動画づくり",
    title: "ChatGPTで作る<br>海外ウケ和風デザイン",
    plainTitle:
      "子どもが起きる前の30分で作れる！ChatGPTで作る海外ウケ和風デザイン完全ガイド",
    description:
      "子どもが起きる前の30分で作れる、海外で人気の和風デザイン。ChatGPTでの作り方をまとめました。",
    tags: ["画像生成", "和風デザイン", "海外販売"],
    url: NOTE_BASE + "n34e8a1f26996",
    image: "assets/thumbs/note-wafu-design.jpg",
  },
  {
    id: "note-subsc-list",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "04",
    type: "note",
    category: "ChatGPT・AI活用",
    title: "毎月のサブスク<br>AIに頼んだら10分で一覧表",
    plainTitle:
      "毎月のサブスク、全部把握できてますか？AIに頼んだら10分で一覧表ができた話",
    description:
      "把握しきれていない毎月のサブスクを、AIに頼んで10分で一覧表にした実際の手順を紹介します。",
    tags: ["家計管理", "時短", "ChatGPT"],
    url: NOTE_BASE + "n977cbd7f5a40",
    image: "assets/thumbs/note-subsc-list.jpg",
  },
  {
    id: "note-rakuten-room",
    number: "03",
    type: "note",
    category: "AIで副業・在宅ワーク",
    title: "スマホ1回ポチッで丸投げ<br>AI×楽天ROOM自動化",
    plainTitle:
      "🎁 スマホ1回ポチッで丸投げ！40代からの最新AI×楽天ROOM自動化マニュアル",
    description:
      "スマホの操作1回で、楽天ROOMの投稿をAIに丸投げする仕組みの作り方をまとめたマニュアルです。",
    tags: ["楽天ROOM", "自動化", "スマホ完結"],
    url: NOTE_BASE + "n015f0fe0a0f4",
    image: "assets/thumbs/note-rakuten-room.jpg",
  },
  {
    id: "note-tesou-shindan",
    number: "02",
    type: "note",
    category: "ChatGPT・AI活用",
    title: "「自分の現在地」を客観視する<br>自己分析プロンプト",
    plainTitle:
      "ChatGPTで「自分の現在地」を客観視する。未来を切り拓くための自己分析プロンプト【手相診断】",
    description:
      "今の自分の立ち位置をChatGPTで客観的に整理し、次の一歩を考えるための自己分析プロンプトです。",
    tags: ["自己分析", "プロンプト", "手相診断"],
    url: NOTE_BASE + "nab43b7c4b777",
    image: "assets/thumbs/note-tesou-shindan.jpg",
  },

  // ============================================================
  // ③ プロンプト型 … ページ内で本文が開きます
  // ============================================================
  {
    id: "prompt-factcheck",
    thumbAuto: true, // サムネイルは gen-thumb.js で自動生成
    number: "01",
    type: "prompt",
    category: "ChatGPT・AI活用",
    title: "ファクトチェック<br>プロトコル",
    plainTitle: "ファクトチェック・プロトコル（カスタム指示）",
    description:
      "AIの「それっぽい嘘」を防ぐために私が普段から使っているカスタム指示です。コピペしてお使いください。",
    tags: ["カスタム指示", "ファクトチェック", "コピペOK"],
    note: "ぜひご自身のカスタム指示にコピペして使ってみてくださいね♪",
    prompt: `【ファクトチェック・プロトコル】
以下の制約を厳守し、エビデンスに基づいた回答のみを出力せよ。

■ 厳守ルール
・不確かな情報は「不明」と断定すること
・推測を含む場合は必ず「※推測」と付記すること
・回答時点の日本時間（JST）を常に意識すること
・可能な限り一次ソースのURLを添付すること
・専門外の領域は「専門家への確認推奨」と明記すること

■ 出力フォーマット
【結論】（一言で）
【根拠】（事実ベース）
【注意点】（例外やリスク）
【参照元】（URLやソース名）
【情報の確実性】（S〜Cランク）`,
    image: "assets/thumbs/prompt-factcheck.jpg",
  },
];
