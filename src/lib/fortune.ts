export type PersonalityType = "challenger" | "seeker" | "harmonizer" | "guardian";

export const TYPE_ORDER: PersonalityType[] = [
  "challenger",
  "seeker",
  "harmonizer",
  "guardian",
];

export const TYPE_INFO: Record<
  PersonalityType,
  { label: string; emoji: string; description: string }
> = {
  challenger: {
    label: "挑戦者",
    emoji: "🔥",
    description:
      "今のあなたは、じっとしているより動きながら答えを探したい気分。新しいことに飛び込むエネルギーに満ちている今だからこそ、迷ったときは考えるより先に一歩踏み出してみると、道が開けていくはずです。",
  },
  seeker: {
    label: "探求者",
    emoji: "🔭",
    description:
      "今のあなたは、目の前のことをじっくり掘り下げたい気分。表面的な情報だけでは物足りず、自分の目で確かめて納得したい今だからこそ、気になったことに時間をかけて向き合ってみると、思わぬ発見に出会えるはずです。",
  },
  harmonizer: {
    label: "調和者",
    emoji: "🤝",
    description:
      "今のあなたは、誰かと気持ちを分かち合いたい気分。一人で抱え込むよりも、周りの人と支え合うことで物事がうまく運びやすい今だからこそ、素直な一言を伝えてみると、思いがけない助けやつながりが生まれるはずです。",
  },
  guardian: {
    label: "守護者",
    emoji: "🛡️",
    description:
      "今のあなたは、自分のペースを大切に守りたい気分。急かされるよりも、落ち着いて足元を整えることで力を発揮できる今だからこそ、焦らず自分の内側の感覚を信じてみると、着実な一歩に繋がるはずです。",
  },
};

export type Question = {
  key: string;
  label: string;
  options: { text: string; type: PersonalityType }[];
};

// シナリオ形式の設問。選択肢を読んだだけではどのタイプに繋がるか
// わかりにくいよう、性格を直接表す言葉(情熱的/好奇心旺盛 等)は避けている。
// 一つの神社参拝の流れに沿った6場面(鳥居→参道→手水舎→賽銭/鈴→祈り→帰り道)。
export const QUESTIONS: Question[] = [
  {
    key: "q1",
    label: "神社の鳥居の前に立った。一歩を踏み出す瞬間の気持ちは?",
    options: [
      { text: "迷わず、勢いよく踏み出す", type: "challenger" },
      { text: "鳥居の形や由来が気になり、じっくり見上げてから進む", type: "seeker" },
      { text: "一緒に来た人と顔を見合わせ、微笑んでから進む", type: "harmonizer" },
      { text: "一礼して、心を静めてから静かに進む", type: "guardian" },
    ],
  },
  {
    key: "q2",
    label: "参道を歩いていると、自然と目や耳が向くのは?",
    options: [
      { text: "木漏れ日がきらめく先、まだ見ぬ本殿の方向", type: "challenger" },
      { text: "石畳の模様や、脇に並ぶ灯籠の年季", type: "seeker" },
      { text: "すれ違う参拝者と交わす、小さな会釈", type: "harmonizer" },
      { text: "玉砂利を踏む音と、足元のリズム", type: "guardian" },
    ],
  },
  {
    key: "q3",
    label: "手水舎で柄杓を手に取った。水を含んだ瞬間、まず感じるのは?",
    options: [
      { text: "水の冷たさにハッとして、体温が上がる感覚", type: "challenger" },
      { text: "作法の順番を思い出しながら、丁寧になぞる意識", type: "seeker" },
      { text: "隣で清めている人のペースに、なんとなく合わせる感覚", type: "harmonizer" },
      { text: "一つ一つの動作を、急がずゆっくり行う落ち着き", type: "guardian" },
    ],
  },
  {
    key: "q4",
    label: "賽銭箱の前に立ち、賽銭を入れて鈴を鳴らす。その所作は?",
    options: [
      { text: "迷いなく、思い切りよく鈴を鳴らす", type: "challenger" },
      { text: "鈴の音の響き方や余韻に、耳を澄ませる", type: "seeker" },
      { text: "大切な人の顔を思い浮かべながら、そっと入れる", type: "harmonizer" },
      { text: "両手でそっと、丁寧に賽銭を入れる", type: "guardian" },
    ],
  },
  {
    key: "q5",
    label: "目を閉じて手を合わせた瞬間、心に浮かぶのは?",
    options: [
      { text: "「よし、やってやる」という前向きな決意", type: "challenger" },
      { text: "「今の自分に必要なものは何だろう」という問い", type: "seeker" },
      { text: "支えてくれる人たちへの感謝の気持ち", type: "harmonizer" },
      { text: "何も願わず、ただ静かに手を合わせる無心の時間", type: "guardian" },
    ],
  },
  {
    key: "q6",
    label: "参拝を終え、鳥居を振り返った。最後に心に残る景色は?",
    options: [
      { text: "遠くまで続く、空の広がり", type: "challenger" },
      { text: "気になった場所を、もう一度目で辿る自分", type: "seeker" },
      { text: "一緒に来た人の、ほっとした横顔", type: "harmonizer" },
      { text: "静まり返った境内の、澄んだ空気", type: "guardian" },
    ],
  },
];

export function tallyPersonalityType(answers: PersonalityType[]): PersonalityType {
  const counts: Record<PersonalityType, number> = {
    challenger: 0,
    seeker: 0,
    harmonizer: 0,
    guardian: 0,
  };
  for (const a of answers) counts[a] += 1;

  let best: PersonalityType = TYPE_ORDER[0];
  for (const t of TYPE_ORDER) {
    if (counts[t] > counts[best]) best = t;
  }
  return best;
}

// --- 60パターンの「守護神」計算 ---
// 生年月日からユリウス日を求め、60(=12柱 x 5つの刻)の周期に変換する。
// 実在の暦法(干支・九星気学など)には基づかない、本アプリ独自の簡易ロジック。
function toJulianDayNumber(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

export type God = {
  name: string;
  reading: string;
  emoji: string;
  keyword: string;
  personality: string;
  deepDive: string;
  relationshipDeepDive: string;
  strengths: string[];
  weaknesses: string[];
  loveStyle: string;
  workStyle: string;
  compatibleWith: string;
  luckyColor: string;
  luckyItem: string;
  imagePrompt: string;
  image: string;
  // カードのヒーロー部分用の横長画像(1920x500目安)。指定があればこちらを
  // 優先表示し、なければ image を縦長クロップして表示する。
  heroImageWide?: string;
  // 印刷用ページの各セクションに添える横長バナー(1376x768目安)。
  // [プロフィールA, プロフィールB, アドバイス1, アドバイス2, アドバイス3]の順。
  // 未整備の神様はundefinedのままでよい(該当ページは画像なしで表示される)。
  illustrations?: string[];
};

export type Phase = {
  name: string;
  reading: string;
  keyword: string;
  description: string;
  deepDive: string;
  luckyAction: string;
};

export const GODS: God[] = [
  {
    name: "暁天神",
    reading: "ぎょうてんしん",
    emoji: "🌅",
    keyword: "新しい一歩を踏み出す力",
    personality:
      "夜明けの光のように、物事の始まりを司る神。誰も足を踏み入れていない場所にまっさきに向かい、道なき道を切り拓くことに喜びを感じるタイプです。じっとしているよりも、まず動いて確かめることで自分の輪郭がはっきりしていきます。",
    deepDive:
      "人からどう見られるかよりも、自分がまだ誰も足を踏み入れていない場所に辿り着けているかどうかを大切にします。同じ日々が続くと心のどこかで物足りなさを感じはじめ、無意識のうちに新しい刺激を探しにいくでしょう。挑戦している最中は多少のつまずきも気にならず、むしろ「まだ試していないやり方」を探すことに夢中になれるタイプです。慎重になりすぎて動けなくなるくらいなら、多少雑でも一歩踏み出した方が、結果的に多くを学べます。誰かに背中を押されるのを待つよりも、自分で扉を開けたときの方が、ずっと納得のいく結果に辿り着けるでしょう。また、目の前に選択肢が多いほど燃えるタイプでもあります。安全な道と冒険的な道が並んでいたら、自然と後者に惹かれてしまうでしょう。停滞している時間が長く続くと、心の中に小さな苛立ちが溜まっていくので、定期的に新しい目標や刺激を自分に与えてあげることが、機嫌よく過ごすための秘訣です。頑張っている自分を誰かに認めてもらうことよりも、自分自身が「今日も一歩進めた」と実感できるかどうかを大切にしています。周りの評価はあくまでおまけのようなもの。人と比べて落ち込むよりも、昨日の自分と比べて何が変わったかに目を向けると、着実に前進している自分に気づけるはずです。小さな達成でも自分をしっかり褒めてあげる習慣が、次の挑戦への燃料になります。迷ったときは、頭より先に体を動かすことで答えが見えてくるタイプです。じっとしている時間が長いほど、かえって迷いは深まっていきます。",
    relationshipDeepDive:
      "人間関係においても、駆け引きよりストレートなやりとりを好みます。回りくどい言い方をされるより、多少ぶつかってでも本音で話してくれる相手を信頼しやすいタイプです。自分から誘ったり声をかけたりすることに抵抗がないので、新しい出会いの場でも物怖じせずに輪の中心になれるでしょう。ただし勢いのまま踏み込みすぎて、相手のペースを置き去りにしてしまうこともあるので、時には相手が今どんな気持ちでいるかを確かめる一呼吸も大切です。衝突が起きても、根に持たずすぐに切り替えられるさっぱりとした一面もあります。ただし相手が同じようにすぐ切り替えられるとは限らないため、勢いで言ってしまった言葉は、後からフォローする一言を添えると関係がより長続きします。それでも根っこの部分では誰よりも人懐っこく、一度仲良くなった相手のことは長く大切にし続けます。連絡の頻度が少なくても、気持ちが離れているわけではないと知っておいてもらえると安心です。褒められることよりも、一緒に何かに挑戦してくれる相手にこそ、心からの信頼を寄せるようになります。",
    strengths: ["決断の速さ", "新しいことへの適応力", "周囲を鼓舞する行動力"],
    weaknesses: ["飽きっぽく長続きしにくい", "勢い任せで準備不足になりがち"],
    loveStyle: "好きになったらまっすぐ。駆け引きよりも「会いたいから会う」を大切にする、素直な恋をします。",
    workStyle: "指示を待つより自分から動くタイプ。0から1を生み出す立ち上げのフェーズで真価を発揮します。",
    compatibleWith: "満月神",
    luckyColor: "夜明けのオレンジ",
    luckyItem: "腕時計",
    image: "/gods/gyoutenshin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A youthful Japanese dawn goddess, beautiful young woman, Goddess of Awakening Dawn, standing full-length at the edge of a cliff facing the sunrise, dynamic forward-leaning pose, flowing orange and gold hakama robes, long hair blown by wind, holding a small brass pocket watch, sunrise light rays, warm orange and gold color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/gyoutenshin-01-profile-a.png",
      "/gods/illustrations/gyoutenshin-02-advice1.png",
      "/gods/illustrations/gyoutenshin-03-advice2.png",
      "/gods/illustrations/gyoutenshin-04-advice3.png",
    ],
  },
  {
    name: "疾風神",
    reading: "しっぷうしん",
    emoji: "🌬️",
    keyword: "軽やかに動き続ける力",
    personality:
      "風のようにしなやかに、その場その場で最適な形へ姿を変えられる神。一つの場所やルールに縛られることを嫌い、軽やかなフットワークで色々な世界を渡り歩くことに心地よさを感じます。",
    deepDive:
      "同じ場所に長くとどまることよりも、風のように色々な景色を見て回ることに心地よさを感じます。ルールや慣習に縛られると息苦しさを覚え、自分なりのやり方を見つけたときにようやく本領を発揮できるタイプです。周囲からは掴みどころがないと思われることもありますが、それはあなたが常に「今の自分に一番合った形」を探し続けている証拠。一つの正解に縛られず、状況に応じて柔軟にやり方を変えられることこそ、あなたが持つ一番の武器です。窮屈さを感じたら、無理に我慢せずその場を離れる選択肢を持っておいてよいでしょう。また、複数のことを同時に抱えていても、それぞれを軽やかにこなせるバランス感覚を持っています。逆に一つのことにじっくり縛られる状況が続くと、知らず知らずのうちにストレスが溜まっていくタイプなので、意識的に予定に余白や自由時間を作っておくことが心の健康につながります。変化のない毎日が続くと、心の中で「何かが違う」という違和感がじわじわ大きくなっていきます。そんなときは無理に耐えるのではなく、模様替えや小旅行など、ささやかな変化を生活に取り入れてみましょう。それだけで気持ちがすっと軽くなり、また前を向いて動き出せるようになるはずです。あなたにとって変化は不安の種ではなく、むしろ活力の源なのです。予定にない出来事ほど、あなたを生き生きとさせる力を持っています。きっちり決めすぎない余白のある計画が、一番性に合っているでしょう。",
    relationshipDeepDive:
      "人との関わりでも、束縛や決まりきった関係よりも、自由に行き来できる心地よい距離感を好みます。会いたいときに会い、離れたいときは離れられる、そんな関係性の中でこそ本来の魅力を発揮できるタイプです。頻繁に連絡を取り合わなくても、会えばすぐに打ち解けられる身軽さがあります。ただし相手によっては「距離を置かれた」と感じてしまうこともあるため、大切な人には時々「ちゃんと気にかけている」という一言を伝えると安心してもらえるでしょう。新しい人との出会いを恐れず、初対面でも自然体でいられるのも強みの一つです。ただ深い関係を築くには時間よりも「一緒に過ごした経験の濃さ」が鍵になるため、たまには予定のない時間を誰かと共有してみると、関係がぐっと深まるきっかけになるでしょう。深い関係を避けているわけではなく、ただ「縛られること」への抵抗感が強いだけです。信頼できる相手には、自分から素直に頼ったり甘えたりする一面も見せられると、関係はより安定していくでしょう。重たい約束事より、気軽に「また今度」と言い合える関係の方が、長く自然に続いていきます。",
    strengths: ["環境適応力の高さ", "フットワークの軽さ", "新しい風を運ぶ発想力"],
    weaknesses: ["一つのことを続けるのが苦手", "落ち着きがないと思われやすい"],
    loveStyle: "束縛を嫌い、お互いの自由を尊重できる相手と長続きします。追いかけられるより対等な関係を好みます。",
    workStyle: "マルチタスクや変化の多い環境で力を発揮。ルーティンより臨機応変な対応が得意です。",
    compatibleWith: "黄金神",
    luckyColor: "スカイブルー",
    luckyItem: "軽量のバッグ",
    image: "/gods/shippuushin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A free-spirited Japanese wind goddess, beautiful young woman, Goddess of the Swift Wind, robes and long hair swept by strong wind, light traveler's attire, sky blue and white fabric, standing full-length on a windswept plain or floating cloud, carrying a small lightweight satchel, dynamic windblown motion, sky blue color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/shippuushin-01-profile-a.png",
      "/gods/illustrations/shippuushin-02-advice1.png",
      "/gods/illustrations/shippuushin-03-advice2.png",
      "/gods/illustrations/shippuushin-04-advice3.png",
    ],
  },
  {
    name: "大地神",
    reading: "だいちしん",
    emoji: "🏔️",
    keyword: "揺るがない安定感",
    personality:
      "どっしりと構え、何があっても動じない大地のような神。派手さはないものの、その揺るぎなさが周囲にとって何よりの安心材料になります。積み上げてきたものを大切にするタイプです。",
    deepDive:
      "派手な変化を求めるよりも、日々の小さな積み重ねの中に確かな手応えを感じるタイプです。急かされるとかえって本来の力を発揮できず、自分のペースを守れているときにこそ、周囲が驚くほどの粘り強さを見せます。裏切らない努力の積み重ねが、いつの間にか誰にも真似できない土台を築いていくでしょう。結果がすぐに出なくても焦る必要はありません。地道な歩みそのものが、あなたにとって一番信頼できる武器になっていきます。目に見える成果が出るまでに時間がかかっても、途中で投げ出さない粘り強さは誰にも真似できません。周囲が焦っている時ほど、あなたの落ち着いた対応が場を安定させる力になります。ただし自分の中で「こうあるべき」という基準が強くなりすぎると、柔軟な対応が必要な場面で身動きが取りにくくなることもあるため、時には流れに身を任せる余裕も持っておきたいところです。周囲が目まぐるしく変化していく中でも、あなたが変わらずそこにいてくれるというだけで、多くの人が安心感を得ています。自分では気づきにくいことですが、その存在感は言葉以上の説得力を持っています。無理に自分を変えようとせず、今のペースを保ちながら、少しずつ新しいことを取り入れる工夫をすると、安定感を保ったまま成長を続けられるでしょう。急な変更や予定外の出来事にも、時間をかければきちんと対応できる柔軟さを内側に持っています。慣れるまでの猶予さえあれば、あなたは十分に対応できるのです。",
    relationshipDeepDive:
      "人間関係では、多くを語らずとも変わらない態度で接し続けることで、深い信頼を築いていくタイプです。派手なアプローチはしなくても、困ったときにそっと手を差し伸べてくれる存在として頼りにされることが多いでしょう。時間をかけて築いた関係ほど長続きしやすく、一度心を許した相手には驚くほど誠実に向き合います。ただし変化を嫌うあまり、関係の見直しが必要な場面でも動きが遅れがちなので、時には自分から一歩踏み出す勇気も大切です。相手の変化にすぐには気づけないこともありますが、一度気にかけると決めた相手には長く継続的な愛情を注ぎます。関係が長くなるほど当たり前になってしまいがちなので、節目節目で感謝の言葉を伝えることを忘れずにいると、関係はより強固なものになるでしょう。感情表現は控えめでも、行動の端々に思いやりが表れるタイプです。言葉で気持ちを伝えるのが苦手なら、態度や行動で示し続けることを大切にしてください。それがいずれ、何よりの安心材料として相手に届いていきます。何かを頼まれると断れないタイプでもあるので、時には自分の許容量を優先して断る練習も必要です。",
    strengths: ["圧倒的な安定感", "周囲を支える包容力", "コツコツ積み上げる継続力"],
    weaknesses: ["変化への対応に時間がかかる", "頑固になりやすい"],
    loveStyle: "一目惚れよりも時間をかけて育む恋。誠実に寄り添い続けることで深い信頼関係を築きます。",
    workStyle: "地道な積み重ねが必要な仕事で本領発揮。縁の下の力持ちとしてチームを支える役回りが向いています。",
    compatibleWith: "白銀神",
    luckyColor: "テラコッタ",
    luckyItem: "使い込んだ手帳",
    image: "/gods/daichishin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A sturdy Japanese earth goddess, graceful yet strong woman, Goddess of Unshaken Earth, calm grounded stance, heavy terracotta and brown robes with stone-like texture patterns, standing full-length amid ancient rocks and roots, holding a worn leather notebook, calm powerful presence, warm earthy terracotta color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/daichishin-01-profile-a.png",
      "/gods/illustrations/daichishin-02-advice1.png",
      "/gods/illustrations/daichishin-03-advice2.png",
      "/gods/illustrations/daichishin-04-advice3.png",
    ],
  },
  {
    name: "清流神",
    reading: "せいりゅうしん",
    emoji: "💧",
    keyword: "澄んだ直感",
    personality:
      "澄んだ水のように、物事の本質をまっすぐ見通す神。表面的な情報に惑わされず、静かな観察眼で真実を見抜く力を持っています。流れるように環境に馴染むしなやかさも特徴です。",
    deepDive:
      "感情に流されるよりも、一歩引いた視点で物事の本質を見極めることに安心感を覚えるタイプです。表面的な言葉よりも、その奥にある本当の意図を汲み取ろうとするため、周囲から「よく見ている人」として信頼されることが多いでしょう。無理に自分を主張しなくても、静かな観察眼と柔軟な対応力が、結果的にあなたを頼れる存在にしてくれます。答えを急がず、物事が自然に落ち着くところまで見守る余裕を持てると、より多くのものが見えてくるはずです。周囲が感情的になっている場面でも、一人だけ冷静さを保てることが多く、結果としてその場の空気を落ち着かせる役割を担うことがあります。ただし冷静でいようとするあまり、自分自身の本音を後回しにしてしまう癖もあるため、信頼できる相手の前では素直な気持ちを言葉にする練習をしてみるとよいでしょう。周囲のペースに合わせることは得意でも、本当は自分の中に確固たる基準を持っています。それを表に出す機会が少ないだけで、実際には強い意志を秘めているタイプです。信頼できる環境に身を置けたときほど、その静かな強さがはっきりと形になって表れてくるでしょう。無理に周りに合わせすぎず、自分の感覚を優先する場面があってもよいはずです。情報が多く混乱しやすい場面でも、余計なノイズを自然と取り除いて本質だけを見抜く力があります。焦って結論を急がされる環境は、本来の実力を発揮しにくくします。",
    relationshipDeepDive:
      "人との関わりにおいても、まずは相手をよく観察してから距離を縮めていく慎重なタイプです。表面的な付き合いよりも、お互いの本音がわかる深い関係を望むため、信頼できると判断した相手には惜しみなく心を開きます。聞き役に回ることが多く、相談されやすい存在でもあるでしょう。ただし自分の気持ちを後回しにしがちなので、たまには自分から素直な感情を言葉にしてみると、関係がより対等なものになっていきます。じっくり時間をかけて築いた関係ほど、揺るがない強さを持ちます。表面的な社交辞令よりも、静かな時間を共有できる相手との方が心を開きやすいでしょう。自分から誘うことは少なくても、誘われたことにはきちんと応える誠実さがあり、それが信頼の積み重ねにつながっています。多くを語らずとも、相手の変化に誰よりも早く気づくことができます。その観察力を素直に言葉にして伝えると、相手はあなたがどれだけ気にかけてくれているかを実感できるでしょう。第一印象だけで人を判断せず、時間をかけて相手の本質を見ようとする姿勢が、結果的に深い信頼関係を生みます。",
    strengths: ["物事を見抜く洞察力", "柔軟に状況へ馴染む力", "冷静な判断力"],
    weaknesses: ["感情を表に出すのが苦手", "流されやすい一面もある"],
    loveStyle: "じっくり相手を観察してから距離を縮めるタイプ。信頼できると分かった相手には深い愛情を注ぎます。",
    workStyle: "分析や調査など、本質を見極める仕事が得意。データや裏付けをもとに動くと力を発揮します。",
    compatibleWith: "蒼穹神",
    luckyColor: "アクアブルー",
    luckyItem: "水筒",
    image: "/gods/seiryuushin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A serene Japanese water goddess, beautiful young woman, Goddess of the Clear Stream, calm observant expression, flowing pale aqua blue robes resembling rippling water, standing full-length beside a clear mountain stream, holding a small water flask, cool tranquil atmosphere, aqua blue color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/seiryuushin-01-profile-a.png",
      "/gods/illustrations/seiryuushin-02-advice1.png",
      "/gods/illustrations/seiryuushin-03-advice2.png",
      "/gods/illustrations/seiryuushin-04-advice3.png",
    ],
  },
  {
    name: "灯火神",
    reading: "とうかしん",
    emoji: "🕯️",
    keyword: "内に秘めた情熱",
    personality:
      "小さな灯りのように、内に静かな情熱を燃やし続ける神。声高に主張はしなくても、心の中には誰にも消せない熱量を持っています。大切なもののためなら粘り強く頑張れるタイプです。",
    deepDive:
      "声高に想いを語るよりも、静かに心の中で燃やし続ける情熱こそがあなたの原動力です。表面的には落ち着いて見えても、大切なものに対しては驚くほど粘り強く向き合い続けることができます。すぐに結果が出なくても諦めずに続けられるのは、あなたの中に確かな灯りが灯っているから。無理に感情を表に出す必要はなく、行動で示した想いは、いずれきちんと相手や周囲に伝わっていくでしょう。周囲から見ると地味に感じられる作業でも、自分の中に意味を見出せた瞬間から驚くほどの集中力を発揮します。情熱の対象が定まっていない時期は、少し元気がないように見えることもありますが、それは次に燃やすべきものをじっくり探している証拠。焦らず、自分の心が動くものを探し続けてください。周囲のテンションに合わせて盛り上がる必要はなく、自分のペースで淡々と物事に取り組むスタイルが一番力を発揮します。地味に見える継続の先に、誰も辿り着けない領域があることを、あなた自身がいつか実感することになるでしょう。焦らず、自分の炎を消さずに燃やし続けることを大切にしてください。熱意を注げる対象を見つけたときのあなたは、周囲が驚くほどの粘り強さを発揮します。その対象は人から与えられるものではなく、自分自身の内側から見つけるものです。",
    relationshipDeepDive:
      "人間関係では、言葉数は少なくても行動で誠実さを示すタイプです。派手なアピールをしなくても、約束を守り続けたり、さりげなく気にかけたりする積み重ねが、相手にとって何より安心できる存在になっていきます。想いを溜め込みすぎると、ある日突然感情があふれてしまうこともあるため、信頼できる相手には少しずつ本音を漏らしていく練習をしてみるとよいでしょう。感情表現が控えめなぶん、相手に「本当に想われているのか」という不安を抱かせてしまうこともあります。言葉で伝えるのが苦手でも、記念日を覚えていたり、さりげない気配りを続けたりすることで、あなたの誠実さはきちんと伝わっていくでしょう。多くを語らないぶん、たまにこぼす本音の一言が、相手にとって何よりの宝物になります。少しずつでいいので、自分の内側にある想いを言葉にして共有する機会を増やしてみましょう。そばにいるだけで安心できる存在になれるタイプなので、無理に会話を盛り上げようとしなくても大丈夫です。",
    strengths: ["内に秘めた情熱の強さ", "粘り強さ", "大切な人への献身"],
    weaknesses: ["自分の気持ちを言葉にするのが苦手", "無理をして抱え込みやすい"],
    loveStyle: "静かに、でも一途に想い続けるタイプ。言葉よりも行動で愛情を示します。",
    workStyle: "地味に見えても情熱を注げるテーマに出会うと、驚くほどの集中力を発揮します。",
    compatibleWith: "静寂神",
    luckyColor: "ワインレッド",
    luckyItem: "キャンドル",
    image: "/gods/toukashin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A quiet Japanese flame goddess, beautiful young woman, Goddess of the Inner Flame, standing full-length, gentle composed expression, deep wine red robes with subtle ember patterns, cradling a small glowing candle or lantern in both hands, warm soft glow illuminating her face, dim mystical background, wine red and amber color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/toukashin-01-profile-a.png",
      "/gods/illustrations/toukashin-02-advice1.png",
      "/gods/illustrations/toukashin-03-advice2.png",
      "/gods/illustrations/toukashin-04-advice3.png",
    ],
  },
  {
    name: "深緑神",
    reading: "しんりょくしん",
    emoji: "🌲",
    keyword: "じっくり育てる力",
    personality:
      "森のように、時間をかけて物事を育てる神。すぐには結果が出なくても、焦らず世話を続けられる忍耐力があります。人やものを育てることに喜びを感じるタイプです。",
    deepDive:
      "すぐに結果を求めるよりも、時間をかけて丁寧に育てていくプロセスにやりがいを感じるタイプです。人であれ物事であれ、じっくり向き合った分だけ確かな成長が返ってくることを、経験として知っています。周囲のスピードに焦って合わせる必要はなく、あなたのペースで育てたものほど、後々大きな実りをもたらすでしょう。誰かの成長を見守ることに幸せを感じる一方で、自分自身を育てる時間も忘れずに確保してください。目先の効率よりも、長い目で見たときに何が本当にその人やものごとのためになるかを考えるタイプです。すぐに結果を求められる環境ではもどかしさを感じることもありますが、あなたが育てたものは、時間が経つほど確かな強さを持つようになります。焦らされる場面でも、自分の育て方を信じてください。誰かの成長を見届けたときの喜びは、あなたにとって何にも代えがたいものです。ただしその分、結果が出るまでの時間がかかる分野では、周囲の焦りに影響されて自信をなくしてしまうこともあります。あなたが育てているものは、ゆっくりでも確実に根を張っていることを忘れないでください。結果が出るまでの過程そのものに意味を見出せるからこそ、長期的なプロジェクトほど力を発揮します。周囲の評価より、自分の中の納得感を大切にしてください。",
    relationshipDeepDive:
      "人との関わりでは、相手の成長やペースにそっと寄り添うことができる、面倒見の良さが際立ちます。困っている人を放っておけず、自然とサポート役に回ることが多いでしょう。頼られることに喜びを感じる一方、いつも与える側に回りすぎて、自分が助けを求めるのが苦手になりがちです。たまには自分から「助けてほしい」と言葉にしてみることで、関係はより対等で温かいものになります。相手のペースを尊重するあまり、自分の意見を飲み込んでしまうことも少なくありません。支える側に回るのが得意な一方で、たまには自分が支えられる側になることも、関係のバランスを保つうえで大切です。素直に甘えられる相手を見つけられると、あなたの心はさらに満たされていくでしょう。支える立場に慣れているぶん、自分が弱っているときにそれを隠してしまう癖があります。信頼できる相手にだけは、弱さも見せられる関係を築いておくと、心のバランスがぐっと保ちやすくなるでしょう。見返りを求めず与え続けられる優しさがありますが、たまには自分にもその優しさを向けてあげてください。",
    strengths: ["人を育てる面倒見の良さ", "長期的な視点", "穏やかな包容力"],
    weaknesses: ["変化のスピードについていくのが苦手", "自分のことを後回しにしがち"],
    loveStyle: "相手の成長をそっと支えるような、母性・父性にあふれた恋愛スタイルです。",
    workStyle: "人材育成やコツコツ積み上げるプロジェクトで力を発揮。長期的な視点で物事を進めます。",
    compatibleWith: "陽炎神",
    luckyColor: "モスグリーン",
    luckyItem: "観葉植物",
    image: "/gods/shinryokushin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A gentle Japanese forest goddess, nurturing young woman, Goddess of the Deep Green, standing full-length, warm motherly expression, moss green robes decorated with leaf and vine patterns, surrounded by growing plants, holding a small potted sapling, soft dappled forest light, moss green color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/shinryokushin-01-profile-a.png",
      "/gods/illustrations/shinryokushin-02-advice1.png",
      "/gods/illustrations/shinryokushin-03-advice2.png",
      "/gods/illustrations/shinryokushin-04-advice3.png",
    ],
  },
  {
    name: "満月神",
    reading: "まんげつしん",
    emoji: "🌕",
    keyword: "満ちる感受性",
    personality:
      "満ちる月のように、感受性が豊かで人の心の機微を敏感に察知する神。共感力が高く、言葉にならない相手の気持ちも汲み取れる繊細さを持っています。",
    deepDive:
      "理屈よりも、その場の空気や相手の感情を敏感に感じ取ることに長けているタイプです。人の些細な変化にもすぐ気づけるからこそ、周囲から「話しやすい人」「安心できる人」として頼られる場面が多いでしょう。ただし人の感情を受け止めすぎると、自分の気持ちが置き去りになりやすいので注意が必要です。自分の心を満たす時間を意識的に作ることで、本来の穏やかな輝きをより長く保てます。周囲の感情の変化にいち早く気づくため、誰かがつらそうにしていると放っておけない優しさがあります。ただしその優しさが「自分を犠牲にしてでも」という方向に向かいすぎると、心が消耗してしまうことも。人を助ける前に、まず自分自身の心が満たされているかを確認する習慣を持つとよいでしょう。感受性が豊かなぶん、芸術や音楽、物語など、感情を動かすものに触れることで心が満たされていきます。忙しい日々の中でも、意識的に心を潤す時間を作ることが、あなたが穏やかでいるための大切な習慣になるでしょう。誰かのために涙することも多いあなたですが、自分のために泣く時間があってもいいのです。周りの空気に敏感な分、環境を変えるだけで気持ちがぐっと軽くなることがあります。無理に鈍感になろうとせず、感受性の高さを長所として活かしていきましょう。",
    relationshipDeepDive:
      "人間関係においては、相手の気持ちに寄り添いすぎるあまり、自分の意見を後回しにしてしまうことがあります。周囲の顔色を敏感に読み取れる繊細さは長所である一方、無理に合わせ続けると心が疲れてしまうことも。安心できる関係の中では、遠慮せず自分の気持ちも素直に表現してみましょう。あなたの繊細さを理解してくれる相手とは、深く長く心を通わせていけるはずです。察する力が高いぶん、言葉にされる前に相手の求めていることに気づいてしまうこともしばしば。ただ、その優しさが伝わっているかどうかは別の話なので、気づいたことは行動だけでなく、言葉にして伝えることでより深く相手に届くようになります。相手の変化に敏感なぶん、些細な言葉や態度の違いにも心が揺れやすい一面があります。不安になったときは一人で抱え込まず、素直に「今どう思っている?」と尋ねてみると、安心材料が得られるはずです。共感してもらえたと感じた瞬間に、一気に心を開けるタイプです。安心できる場所を見つけることが何より大切です。",
    strengths: ["高い共感力", "繊細な気配り", "人の心を癒す力"],
    weaknesses: ["感情の波に振り回されやすい", "周囲の影響を受けすぎることがある"],
    loveStyle: "相手の気持ちに寄り添いすぎて、自分を後回しにしがち。安心できる関係の中で本来の魅力が輝きます。",
    workStyle: "人の気持ちを扱う仕事で本領発揮。カウンセリングやサポート業務との相性が抜群です。",
    compatibleWith: "暁天神",
    luckyColor: "ムーンシルバー",
    luckyItem: "アロマオイル",
    image: "/gods/mangetsushin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, An ethereal Japanese moon goddess, beautiful young woman, Goddess of the Full Moon, gentle empathetic gaze, flowing moonlight silver robes with pale glowing accents, standing full-length under a large full moon, soft silver light, delicate silhouette, moonlit night background, moon silver color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/mangetsushin-01-profile-a.png",
      "/gods/illustrations/mangetsushin-02-advice1.png",
      "/gods/illustrations/mangetsushin-03-advice2.png",
      "/gods/illustrations/mangetsushin-04-advice3.png",
    ],
  },
  {
    name: "黄金神",
    reading: "おうごんしん",
    emoji: "🏆",
    keyword: "頂点を目指す意志",
    personality:
      "頂点を目指し続ける野心を持つ神。負けず嫌いで、目標が定まると驚くほどのエネルギーを発揮します。結果を出すことで自分の価値を確かめるタイプです。",
    deepDive:
      "現状維持よりも、常に次の目標を見据えて動き続けることにやりがいを感じるタイプです。結果が数字や形になって見えるほど、あなたの中のエネルギーは大きく燃え上がります。負けず嫌いな一面が原動力になる一方で、結果だけにとらわれすぎると、そこに至る過程の充実感を見落としてしまうことも。時には歩みそのものを味わう余裕を持つと、より長く輝き続けられるでしょう。目標に向かっているときのあなたは、誰よりも生き生きとしたエネルギーを放ちます。逆に目指すものが見つからない時期は、どこか力が入らず物足りなさを感じてしまうかもしれません。そんな時こそ、小さくてもいいので「次に超えたい基準」を自分の中に設定してみると、再びエンジンがかかっていくでしょう。何かを達成したときの高揚感は、あなたにとって何よりのご褒美です。ただしその高揚感が長く続かないことに気づき始めると、次から次へと目標を追い続けることに疲れを感じる瞬間もあるでしょう。時には「なぜそれを目指しているのか」という原点に立ち返ることで、燃え尽きることなく走り続けられるはずです。目標に向かって走っているときのあなたは誰よりも輝いていますが、休むこともまた次の勝利への準備だと考えてみてください。",
    relationshipDeepDive:
      "人との関わりでも、刺激やときめきを求める傾向が強く、対等に高め合える相手といるときに一番輝きます。競争心が強いぶん、負けたくないという気持ちが人間関係に出てしまうこともありますが、それも情熱の裏返しです。相手の成功を素直に喜べるようになると、周囲からの信頼はさらに厚くなるでしょう。勝ち負けだけでなく、一緒に頑張った過程そのものを分かち合う関係を大切にしてみてください。負けたくないという気持ちが強いぶん、大切な人にもつい張り合ってしまうことがあります。でもそれは、相手のことを対等な存在として認めている証でもあるのです。時には勝ち負けを脇に置いて、ただ相手の話に耳を傾けてみると、関係はより深く温かいものになっていくでしょう。高い目標を持つあなたに憧れる人は多く、自然と周囲を引っ張るリーダー的な立場になることもあります。ただし弱さを見せることを避けすぎず、時には頼る姿を見せることで、より深い信頼関係が築けるでしょう。本気で向き合ってくれる相手にこそ、心からの敬意を抱くタイプです。手加減された関係には物足りなさを感じるでしょう。",
    strengths: ["目標達成力", "負けず嫌いなハングリー精神", "周囲を引っ張るカリスマ性"],
    weaknesses: ["結果に固執しすぎることがある", "プロセスを軽視しがち"],
    loveStyle: "刺激やときめきを求めるタイプ。対等に高め合える相手といると輝きます。",
    workStyle: "成果が明確に評価される環境で真価を発揮。競争のある場面ほど燃えるタイプです。",
    compatibleWith: "疾風神",
    luckyColor: "ゴールド",
    luckyItem: "アクセサリー",
    image: "/gods/ougonshin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A confident Japanese golden goddess, regal beautiful woman, Goddess of the Golden Summit, proud posture, radiant gold and crimson ceremonial robes with ornate patterns, glowing golden accessories and jewelry, standing full-length atop a mountain peak, triumphant charismatic aura, gold color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/ougonshin-01-profile-a.png",
      "/gods/illustrations/ougonshin-02-advice1.png",
      "/gods/illustrations/ougonshin-03-advice2.png",
      "/gods/illustrations/ougonshin-04-advice3.png",
    ],
  },
  {
    name: "白銀神",
    reading: "はくぎんしん",
    emoji: "❄️",
    keyword: "研ぎ澄まされた判断力",
    personality:
      "研ぎ澄まされた刃のように、無駄をそぎ落とした美しさを追求する神。物事を論理的に整理し、正確な判断を下すことに長けています。妥協を嫌う完璧主義な一面も。",
    deepDive:
      "曖昧なままにしておくよりも、筋道を立てて納得できる形に整理することに安心感を覚えるタイプです。物事の粗や矛盾に人一倍敏感なぶん、誰よりも精度の高い判断ができます。ただし、その基準を他人にもそのまま求めてしまうと、周囲との間に距離ができてしまうことも。完璧でなくても価値があるものは多いと知ることで、あなたの視野はさらに深く広がっていきます。物事の欠陥や矛盾に気づく力は人一倍鋭く、それが仕事や作品の質を高める大きな武器になります。ただしその鋭さを自分自身にも厳しく向けすぎると、達成しても満足できない苦しさを抱えることも。時には「十分によくやった」と自分を認める基準を、意識的に緩めてあげることも必要です。正確さや美しさを追求する姿勢は、周囲から一目置かれる大きな魅力です。ただし基準の高さゆえに、自分にも他人にも厳しくなりすぎる瞬間があることに、時々立ち止まって気づいてあげてください。完成度よりも「今この瞬間を楽しめているか」を基準にしてみると、心に余裕が生まれるはずです。細部へのこだわりは、あなたにしか気づけない品質の高さを生み出します。ただし全てを完璧にする必要はなく、力を注ぐ場所を選ぶ視点も大切です。",
    relationshipDeepDive:
      "人間関係でも高い基準を持っているため、簡単には心を開かない慎重さがあります。しかし一度信頼した相手には、誰よりも誠実に、筋を通して向き合うタイプです。相手の細かい欠点が目についてしまうこともありますが、完璧さより「一緒にいて心地よいかどうか」を基準にしてみると、より自然な関係が築けるでしょう。厳しさの奥にある思いやりを、時には言葉にして伝えてみてください。感情よりも筋の通った言動を評価するため、誠実さのない相手には早い段階で見切りをつけることもあります。逆に、多少不器用でも誠実であろうとする相手には、時間をかけて心を開いていくでしょう。論理的に物事を考えるタイプですが、大切な人の前では感情を優先してみる練習も必要です。正しさよりも「気持ちに寄り添う」選択をすることで、関係がより温かいものに変わっていくでしょう。誠実さを積み重ねてきた相手には、驚くほど深い信頼を寄せます。その信頼は簡単には揺らぎません。",
    strengths: ["論理的な思考力", "高い美意識", "正確な判断力"],
    weaknesses: ["完璧を求めすぎて疲れやすい", "他者に厳しくなりがち"],
    loveStyle: "理想が高く、簡単には心を開きません。ですが一度信頼した相手には誠実に向き合います。",
    workStyle: "精度が求められる仕事や、美しさ・完成度を追求する分野で力を発揮します。",
    compatibleWith: "大地神",
    luckyColor: "プラチナ",
    luckyItem: "万年筆",
    image: "/gods/hakuginshin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A sharp elegant Japanese silver goddess, poised beautiful woman, Goddess of the Honed Blade, standing full-length, composed expression, platinum white and icy silver robes with sharp geometric patterns, holding an elegant fountain pen or thin blade, cool crisp winter atmosphere, snowflakes drifting, platinum silver color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/hakuginshin-01-profile-a.png",
      "/gods/illustrations/hakuginshin-02-advice1.png",
      "/gods/illustrations/hakuginshin-03-advice2.png",
      "/gods/illustrations/hakuginshin-04-advice3.png",
    ],
  },
  {
    name: "蒼穹神",
    reading: "そうきゅうしん",
    emoji: "🌌",
    keyword: "自由に広がる発想",
    personality:
      "広い空のように、自由な発想でスケールの大きなビジョンを描く神。常識やルールにとらわれず、誰も思いつかないような視点で物事を見ることができます。",
    deepDive:
      "決められた枠の中で動くよりも、まだ誰も見たことのない景色を思い描くことにワクワクするタイプです。細部を詰めるよりも、まず大きな絵を描くことから始めるため、周囲から突飛に見えるアイデアほど、後になって時代を先取りしていたと気づかれることも。地に足をつけた人と組むことで、その壮大なビジョンは絵空事ではなく現実の形へと変わっていくでしょう。目の前の細かい制約よりも、その先にある可能性の大きさに心が動くタイプです。地に足のついた人からは危なっかしく見えることもありますが、その自由な発想があるからこそ、誰も想像しなかった新しい道が開けることも少なくありません。荒削りなアイデアでも、口に出してみる勇気を持ってください。誰も思いつかないアイデアを形にしたときの高揚感は、あなたにとって何よりの原動力です。ただし壮大な構想ほど実現までに時間がかかるため、途中で周囲の理解が追いつかず孤独を感じることもあるでしょう。そんなときこそ、小さな一歩に分解して進めることで、ビジョンは着実に現実へと近づいていきます。誰もやったことのない発想にこそ価値を感じるタイプです。前例がないことを不安に思うより、むしろ好機だと捉えてみてください。",
    relationshipDeepDive:
      "人との関わりにおいても、自由な発想や夢を語り合える相手といるときに一番心地よさを感じます。束縛や過度な期待をかけられると窮屈さを感じてしまうため、お互いの世界観を尊重し合える関係が理想的です。時に現実離れした話をしてしまい、周囲を置き去りにすることもありますが、その発想力に共感してくれる相手とは、誰よりも深く通じ合えるでしょう。相手の話をスケールの大きな視点で聞くため、悩み相談でも思いがけない角度からの助言をくれる存在です。ただし現実的な着地点を求められる場面では、話が広がりすぎて相手を戸惑わせることもあるので、最後は「つまり何がしたいのか」を一緒に整理してあげると、より頼れる存在になれるでしょう。自由な発想を認めてくれる相手といると、あなたの魅力は何倍にも輝きます。逆に細かく管理されるような関係は息苦しさを感じやすいので、お互いの自由を尊重し合えるかどうかを、関係を築くときの一つの目安にしてみてください。話を最後まで面白がって聞いてくれる相手といると、あなたの発想はさらに自由に広がっていきます。",
    strengths: ["自由な発想力", "スケールの大きなビジョン", "枠にとらわれない柔軟さ"],
    weaknesses: ["現実的な計画が苦手", "地道な作業に飽きやすい"],
    loveStyle: "束縛を嫌い、自由な発想で愛情を表現します。一緒に夢を語り合える相手と相性抜群。",
    workStyle: "企画・アイデア出しなど、ゼロから何かを構想する仕事で真価を発揮します。",
    compatibleWith: "清流神",
    luckyColor: "コズミックブルー",
    luckyItem: "星座早見盤",
    image: "/gods/soukyuushin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A visionary Japanese sky goddess, beautiful young woman, Goddess of the Vast Sky, gazing upward with wonder, flowing cosmic blue robes with star and constellation patterns, floating full-length among clouds and stars, holding an astrolabe or star chart, expansive sky and galaxy background, cosmic blue color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/soukyuushin-01-profile-a.png",
      "/gods/illustrations/soukyuushin-02-advice1.png",
      "/gods/illustrations/soukyuushin-03-advice2.png",
      "/gods/illustrations/soukyuushin-04-advice3.png",
    ],
  },
  {
    name: "静寂神",
    reading: "せいじゃくしん",
    emoji: "🕊️",
    keyword: "揺るがない静けさ",
    personality:
      "静けさの中に深い知恵を宿す神。喧騒から少し離れた場所で物事を俯瞰し、本当に大切なものを見極める力を持っています。多くを語らずとも、その存在感で周囲を安心させます。",
    deepDive:
      "大勢の中で目立つよりも、静かな場所でじっくり物事と向き合うことに心地よさを覚えるタイプです。多くを語らなくても、その落ち着いた佇まいだけで周囲を安心させる力を持っています。孤独を恐れる必要はなく、一人の時間こそがあなたの考えを深め、揺るがない軸を育ててくれます。時折、信頼できる相手にだけ本音を打ち明けることで、心のバランスがより保ちやすくなるでしょう。周囲の評価や流行に振り回されず、自分の内側にある基準で物事を判断できる強さを持っています。孤独な時間を持て余すことなく、むしろその時間を使って考えを深めていけるタイプです。ただし一人で抱え込みすぎると、周囲から距離を置かれていると誤解されることもあるため、時折自分から近況を共有してみるとよいでしょう。静けさの中で得た気づきは、あなたにとって何よりの財産です。ただし考えすぎるあまり、行動に移す前に立ち止まりすぎてしまうこともあるでしょう。すべてを完璧に整理してから動こうとせず、七割の納得感で一歩踏み出してみることも、時には必要です。焦らず物事を見極める姿勢は、周囲が慌てているときほど際立つ強みになります。急かされても、自分の判断のペースを守ってください。",
    relationshipDeepDive:
      "人間関係では、広く浅くよりも、狭く深い関係を好む傾向があります。多くの人と賑やかに過ごすよりも、心を許せる少数の相手とじっくり向き合う時間を大切にするタイプです。感情をあまり表に出さないため、周囲から「何を考えているかわからない」と思われることもありますが、信頼した相手には驚くほど深い誠実さを見せます。たまには自分から心の内を言葉にしてみると、関係がより温かいものになるでしょう。多くを語らない分、言葉にした一言の重みが増すタイプです。困っている人を見過ごせず、静かにそっと手を差し伸べることも多いでしょう。感謝や好意は言葉にしないと伝わりにくいこともあるので、大切な相手には意識して気持ちを言語化してみてください。沈黙を気まずいと感じない相手といるとき、あなたは最も自然体でいられます。無理に会話を埋めようとせず、静かな時間を共有できる相手を大切にすることで、心地よい関係が長く続いていくでしょう。多くを求めない分、そばにいてくれる人の存在をより深く大切にできるタイプです。",
    strengths: ["物事を俯瞰する冷静さ", "深い洞察力", "揺るがない精神的な強さ"],
    weaknesses: ["孤立しやすい", "感情表現が控えめすぎることがある"],
    loveStyle: "静かに深く想うタイプ。言葉数は少なくても、揺るがない誠実さで相手を支えます。",
    workStyle: "専門性を極める仕事や、一人で集中できる環境で本来の実力を発揮します。",
    compatibleWith: "灯火神",
    luckyColor: "ミッドナイトブルー",
    luckyItem: "お気に入りの本",
    image: "/gods/seijakushin.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A serene Japanese goddess of silence, beautiful woman with a calm expression, Goddess of Deep Stillness, eyes gently closed in meditation, deep midnight blue robes with subtle quiet patterns, seated full-length in a tranquil dark forest or quiet shrine, holding an old book, calm profound aura, midnight blue color palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/seijakushin-01-profile-a.png",
      "/gods/illustrations/seijakushin-02-advice1.png",
      "/gods/illustrations/seijakushin-03-advice2.png",
      "/gods/illustrations/seijakushin-04-advice3.png",
    ],
  },
  {
    name: "陽炎神",
    reading: "かげろうしん",
    emoji: "🌀",
    keyword: "変化を楽しむ柔軟さ",
    personality:
      "揺らめく陽炎のように、状況に応じて姿を変える柔軟さと神秘性を併せ持つ神。変化そのものを楽しみ、一つの形にとどまらないことで新しい自分に出会い続けます。",
    deepDive:
      "一つの形にとどまるよりも、状況に応じて自在に姿を変えられることに自由を感じるタイプです。周囲から掴みどころがないと言われることもありますが、それはあなたが常に「今の自分」をアップデートし続けている証。変化を楽しめる柔軟さこそが最大の武器であり、無理に一貫性を求めなくても、あなたらしさはちゃんと一本の軸として保たれています。同じ環境に居続けると、少しずつ息苦しさを感じてしまうタイプです。周期的に環境や役割を変えることで、新しい自分の一面を発見し続けられるでしょう。変わり続けること自体があなたの個性であり、無理に一つの型にはめようとする周囲の声に、必要以上に合わせる必要はありません。変わり続けることに不安を感じる必要はありません。それはあなたが常に成長し、新しい可能性を探し続けている証だからです。周囲が「一貫性がない」と感じるのは、単にあなたの変化の速さについていけていないだけ。自分の変化を面白がれるくらいの余裕を持てると、毎日がもっと軽やかになるでしょう。変化そのものがあなたにとっての安定剤のようなものです。同じ状態が続きすぎると感じたら、小さな模様替えから始めてみてください。",
    relationshipDeepDive:
      "人との関わりでも、予測できない魅力で相手を惹きつけるタイプです。同じパターンの関係に飽きやすく、常に新しい刺激やお互いの変化を楽しめる相手と長続きします。気分にムラが出やすいことで周囲を戸惑わせてしまうこともありますが、それも含めて受け入れてくれる相手となら、誰よりも深く自由な絆を築いていけるでしょう。気分やその時の状況によって態度が変わって見えることもありますが、根底にある誠実さは変わりません。関係を長く続けるコツは、自分の変化を隠さずオープンに伝えること。驚かれることもあるかもしれませんが、それも含めてあなたらしさとして受け止めてもらえる関係が、一番心地よいはずです。多面的な魅力を持つあなたを、一つの型に当てはめようとする相手とは、いずれすれ違いが生まれやすくなります。変化を面白がり、一緒に楽しんでくれる相手とこそ、長く自由な関係を築いていけるでしょう。決まりきった役割を求められるより、その時々のあなたを面白がってくれる関係の方が、ずっと長続きします。",
    strengths: ["変化を楽しむ柔軟性", "独自の視点で物事を捉える発想力", "どんな環境にも溶け込む適応力"],
    weaknesses: ["つかみどころがないと思われやすい", "気分にムラが出やすい"],
    loveStyle: "予測できない魅力で相手を惹きつけるタイプ。変化を受け入れてくれる相手と長く続きます。",
    workStyle: "変化の多いプロジェクトや、常に新しい挑戦がある環境で輝きます。",
    compatibleWith: "深緑神",
    luckyColor: "オーロラカラー",
    luckyItem: "万華鏡",
    image: "/gods/kageroushin.png",
    heroImageWide: "/gods/kageroushin-wide.png",
    imagePrompt:
      "full-body shot, entire body visible from head to toe, wide shot, A mysterious shapeshifting Japanese goddess, ethereal beautiful woman, Goddess of the Shimmering Mirage, standing full-length, ambiguous fluid silhouette, robes in flowing aurora-like iridescent colors shifting between hues, wavering heat-haze visual distortion effect, holding a small kaleidoscope, dreamlike surreal atmosphere, aurora multicolor palette, Japanese fantasy goddess portrait, elegant flowing robes with intricate patterns, mystical atmosphere, soft cinematic lighting, delicate linework, digital painting, highly detailed, trending on artstation --ar 2:3 --niji 6",
    illustrations: [
      "/gods/illustrations/kageroushin-01-profile-a.png",
      "/gods/illustrations/kageroushin-02-advice1.png",
      "/gods/illustrations/kageroushin-03-advice2.png",
      "/gods/illustrations/kageroushin-04-advice3.png",
    ],
  },
];

export const PHASES: Phase[] = [
  {
    name: "目覚めの刻",
    reading: "めざめのとき",
    keyword: "芽生えたばかりの可能性",
    description:
      "今は、新しい可能性がそっと芽吹きはじめたタイミング。まだ形にはなっていなくても、確かな予感がある時期です。",
    deepDive:
      "まだ誰にも気づかれていない小さな変化が、静かに動き始めている時期です。焦って大きな結果を求める必要はなく、今はただ「気になる」という感覚を大切に育てていくことが何より重要。小さな種のうちは頼りなく見えても、丁寧に水をやり続けた先に、思いがけない芽吹きが待っています。この時期に蒔いた種が、後の「高まりの刻」や「満ちの刻」で大きく花開くきっかけになるでしょう。周囲からはまだ何も始まっていないように見えても、あなたの中では確かな変化が進行しています。今は結果を焦らず、興味の芽をどれだけ多く育てられるかが、この先の可能性の広がりを決めていくでしょう。この時期は、完璧な準備が整うことを待つ必要はありません。むしろ整っていない状態から始めることで、進みながら形を整えていく柔軟さが身につきます。小さな一歩を踏み出す勇気こそが、この時期の運気を最も後押ししてくれるでしょう。今はまだ結果を出す段階ではなく、種をまく段階です。芽が出ないことに焦る必要はありません。",
    luckyAction: "気になったことは、深く考える前にまず小さく試してみましょう。",
  },
  {
    name: "高まりの刻",
    reading: "たかまりのとき",
    keyword: "勢いを増すエネルギー",
    description:
      "今は、内側のエネルギーがぐんぐん高まっている時期。動けば動くほど、物事が前に進む勢いを感じられるはずです。",
    deepDive:
      "内側に溜め込んできたエネルギーが、外へ向かって動き出そうとしている時期です。多少の勢い任せになっても、今はその流れに乗ってしまう方が結果的にうまくいきやすいでしょう。動くこと自体が次のチャンスを引き寄せるので、頭で考えすぎるよりも、まず一歩踏み出すことを優先してみてください。このエネルギーは長くは続かないからこそ、今のうちにできる限り前に進んでおくと、後になって大きな差になります。体感的にも「今なら動ける」という手応えを感じやすい時期です。多少強引に見える行動でも、この勢いがあれば思った以上にスムーズに周囲を巻き込んでいけるでしょう。勢いに乗っている今だからこそ、普段は尻込みしてしまうような大きな一歩も、意外なほどすんなり踏み出せるはずです。エネルギーが高まっているうちに、後回しにしていたことへ思い切って着手してみましょう。勢いのあるうちに、後回しにしていたことへ着手すると、驚くほどスムーズに進んでいきます。",
    luckyAction: "やりたいことがあるなら、今が仕掛けどき。勢いに乗ってしまいましょう。",
  },
  {
    name: "満ちの刻",
    reading: "みちのとき",
    keyword: "満ち足りた充実感",
    description:
      "今は、これまで積み上げてきたものが実を結び、満ち足りた充実感に包まれている時期。周囲からの評価も自然とついてくるでしょう。",
    deepDive:
      "これまで積み重ねてきたことが、目に見える形になって返ってくる時期です。周囲からの評価や感謝の言葉として実感できる場面も増えるでしょう。ここで気を抜いてしまうと満ちた運気が緩んでしまうこともあるため、感謝の気持ちを忘れず、丁寧に今の充実を味わうことが次のステージへの土台になります。得たものを独り占めせず、周囲と分かち合う意識を持てると、この満ちた運気はさらに長く続いていきます。この時期に得た成果や信頼は、次の「静まりの刻」を迎えたときの心の支えにもなります。今のうちに、頑張ってきた過程そのものをしっかり記録や記憶に残しておくとよいでしょう。満ち足りた時間は、次第に当たり前のものに感じられてしまいがちです。だからこそ、今この瞬間の充実に意識的に感謝することで、運気の流れがより長く安定して続いていきます。満たされている今だからこそ、周囲への感謝を言葉にすると、運気がさらに長持ちします。",
    luckyAction: "頑張ってきた自分をしっかり認めて、今の充実を味わってみてください。",
  },
  {
    name: "静まりの刻",
    reading: "しずまりのとき",
    keyword: "落ち着いた内省の時間",
    description:
      "今は、慌ただしさから少し離れて、自分自身と静かに向き合う時期。焦らず内側を整えることで、次の一歩がより確かなものになります。",
    deepDive:
      "外に向かっていたエネルギーを、いったん自分の内側に戻すべき時期です。何も生み出していないように感じても、この時間は次の行動の質を大きく左右する大切な準備期間。予定を詰め込みすぎず、あえて余白をつくることで、本当に大切にしたいものが見えてくるはずです。焦って動き出すよりも、今は立ち止まって自分と向き合うことの方が、結果的に近道になります。周りから見ると停滞しているように映るかもしれませんが、内側では静かに大切な整理が進んでいます。この時期に手放したものほど、後になって「手放してよかった」と感じられるはずです。静かに過ごす時間は、何も生み出していないように見えて、実は次のステージへ向けた大切な仕込みの時間です。焦って外に飛び出す前に、まずは自分の内側の声にしっかり耳を傾けてみてください。静かな時間は無駄ではなく、次の一歩をより確かなものにするための準備期間です。",
    luckyAction: "予定を詰め込みすぎず、一人の時間を意識的に作ってみましょう。",
  },
  {
    name: "巡りの刻",
    reading: "めぐりのとき",
    keyword: "巡ってきた変化の波",
    description:
      "今は、これまでの積み重ねが形を変えて巡ってくる時期。手放すことと、新しく迎え入れることのバランスが鍵になります。",
    deepDive:
      "これまで当たり前だと思っていたものが、少しずつ形を変えていく時期です。変化に戸惑いを感じるかもしれませんが、それは何かを失うことではなく、新しい流れを迎え入れるための自然な入れ替わり。執着していたものを手放す勇気を持てた分だけ、次の巡りがスムーズに訪れるでしょう。終わりに見えるものも、実は次の「目覚めの刻」への静かな準備なのです。変化の渦中にいる間は先行きが見えにくく感じますが、巡り終えた先には必ず新しい景色が待っています。今は結果を急がず、流れそのものに身を委ねる意識を持つとよいでしょう。変化を前向きに受け止められるかどうかで、この先の巡りの質が大きく変わってきます。手放すことへの寂しさより、新しく迎え入れるものへの期待に目を向けてみると、この時期を軽やかに乗り越えられるでしょう。変化の途中は先が見えにくくても、巡り切った先には必ず新しい景色が待っています。",
    luckyAction: "古いものへの執着を少し手放すと、新しい流れがスムーズに入ってきます。",
  },
];

function toSexagenaryIndex(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);
  const jdn = toJulianDayNumber(year, month, day);
  return ((jdn + 49) % 60 + 60) % 60;
}

export function getGodAndPhase(dateStr: string): {
  god: God;
  phase: Phase;
  godIndex: number;
  phaseIndex: number;
} {
  const idx = toSexagenaryIndex(dateStr);
  const godIndex = idx % 12;
  const phaseIndex = Math.floor(idx / 12);
  return { god: GODS[godIndex], phase: PHASES[phaseIndex], godIndex, phaseIndex };
}

const ACTION_PLANS: Record<PersonalityType, (god: God, phase: Phase) => string> = {
  challenger: (god, phase) =>
    `${god.name}が持つ${god.keyword}と、${phase.keyword}が重なる今は、頭で考えるよりも先に体を動かした方がうまくいくタイミングです。気になることがあれば、準備が整うのを待たずに小さく始めてみましょう。完璧な計画よりも「まずやってみた」という事実が、次の展開を引き寄せます。もし迷いが生まれたら、「一年後の自分はどちらを選んでいてほしいか」を基準に決めてみてください。多少の失敗は、今のあなたにとって単なる通過点に過ぎません。動いた分だけ景色が変わっていくことを、体感として実感できるはずです。周囲のペースに合わせすぎず、自分の「今動きたい」という感覚を信じてあげましょう。具体的には、ずっと気になっていた予約や申し込みを済ませてしまう、後回しにしていた連絡を自分から送ってみるなど、小さな一歩から試してみてください。一つ行動を起こすたびに、次にやるべきことも自然と見えてくるはずです。また、この時期は多少強引に見えるお願いや提案も、驚くほどすんなり通りやすいタイミングでもあります。遠慮して黙っているより、思っていることを素直に口に出してみましょう。仮に断られたとしても、それは今のあなたにとって大きな痛手にはなりません。むしろ「言ってみた」という経験そのものが、次の挑戦への自信につながっていきます。周囲が慎重になっている場面だからこそ、あなたの一歩が状況を動かすきっかけになるはずです。周囲から「そんなに急がなくても」と言われることがあっても、あなたにとってはこのタイミングを逃さないことの方がずっと重要です。行動した結果がどうであれ、そこから得られる経験値は何物にも代えがたい財産になります。今は結果よりも、行動量そのものを増やすことを意識してみてください。考える時間より動く時間を優先することが、今のあなたには一番合っています。動きながら軌道修正していきましょう。`,
  seeker: (god, phase) =>
    `${god.name}が持つ${god.keyword}と、${phase.keyword}が重なる今は、目の前のことをじっくり掘り下げるのに向いているタイミングです。気になったことがあれば、表面的な情報で満足せず、一歩踏み込んで調べてみましょう。今得た知識や気づきは、すぐには形にならなくても、後になって思いがけない場面であなたを助けてくれます。焦って結論を出すより、「まだ分からないことがある」という状態を楽しむくらいの余裕を持つとよいでしょう。誰かに答えを求めるよりも、自分の目で確かめたことの方が、ずっと納得のいく答えになります。具体的には、気になった本を一冊読んでみる、詳しい人に思い切って質問してみる、普段は素通りする情報を丁寧に調べてみるなど、小さな探求を積み重ねてみてください。好奇心が向いた方向に、遠慮なく時間を使ってみることが、この時期の一番の近道です。また、この時期に集めた情報や気づきは、メモや記録として残しておくことをおすすめします。後から見返したときに、点と点がつながって思いがけない発見に変わることが多いタイミングだからです。誰かと議論したり、自分の考えを言葉にして説明してみたりすることも、理解をさらに深める助けになるでしょう。一つのことを掘り下げれば掘り下げるほど、思いがけない関連性が見えてくるはずです。急がず、自分のペースでじっくり向き合ってみてください。周囲から「そんなに調べてどうするの」と言われることがあっても、あなたにとってその過程こそが一番の楽しみであり、力の源です。すぐに役立たなくても構いません。今蓄えた知識や視点は、思いがけないタイミングであなたを助ける武器になっていくでしょう。答えを急がず、疑問をそのまま持ち続けることも今は立派な前進です。焦らず掘り下げてください。`,
  harmonizer: (god, phase) =>
    `${god.name}が持つ${god.keyword}と、${phase.keyword}が重なる今は、一人で抱え込まず、周りの人と分かち合うことで物事がうまく運びやすいタイミングです。誰かに相談したり、逆に誰かの力になったりすることで、思いがけない気づきや助けが得られるでしょう。あなたが自然に見せる気配りや優しさは、今の時期ならいつも以上に相手に伝わりやすくなっています。一人で頑張りすぎず、頼ることも一つの力だと考えてみてください。誰かと一緒に過ごす時間や、素直な一言の声かけが、想像以上に大きな意味を持つはずです。具体的には、しばらく連絡を取っていなかった人にメッセージを送ってみる、困っていそうな人にさりげなく声をかけてみる、誰かを誘って一緒に何かをしてみるなど、小さなつながりを増やしてみてください。関わる人を大切にする姿勢が、巡り巡ってあなた自身を支えてくれます。また、この時期はあなたが思っている以上に、ちょっとした気遣いや優しさが相手の心に残りやすいタイミングです。大きなことをしようと気負う必要はなく、日常の中の小さな声かけや気配りの積み重ねが、確かな信頼につながっていきます。人と関わる中で疲れを感じたときは、無理に頑張り続けず、一人になる時間もきちんと確保してください。誰かのために動く前に、自分自身の心も満たしておくことで、より自然体で人と関われるようになります。周囲からは何でもないことのように見えても、あなたの気配りは確かな価値があります。その優しさを正当に受け止めてくれる関係を大切に選び、一方通行だと感じる関わりには、時に距離を置く勇気も持っておいてください。頑張りすぎている自覚があるなら、少し肩の力を抜いて、周りに頼ってみる勇気を持ってください。`,
  guardian: (god, phase) =>
    `${god.name}が持つ${god.keyword}と、${phase.keyword}が重なる今は、無理に急がず、自分のペースを守ることが何より大切なタイミングです。周囲の勢いに流されそうになっても、一度立ち止まって「自分は今どうしたいか」を確かめてみてください。静かに整えた準備や積み重ねは、後になって確かな土台として効いてきます。焦らなくても、あなたのペースで進めたことの方が、結果的に長く続く力になるでしょう。人と比べず、自分の内側にある感覚を信じてあげてください。具体的には、部屋や身の回りを整理する、後回しにしていた小さなタスクを一つずつ片付ける、予定を詰め込みすぎずに一人の時間を意識的に確保するなど、静かな積み重ねを大切にしてみてください。ゆっくりでも着実に進んでいることに、もっと自信を持っていいはずです。また、この時期に見直した習慣や整えた環境は、しばらく先まで安定した土台として役立ち続けます。周囲から「もっと早く」「もっと大きく」と急かされる場面があっても、無理に合わせる必要はありません。あなたにとって心地よいペースこそが、長く続けられる一番の近道です。静かな時間の中で見えてきた気づきは、焦らずメモや言葉として残しておくと、後から振り返ったときに大きな支えになるでしょう。周囲から「もっと早く動いた方がいい」と急かされることがあっても、あなたにとって大切なのは着実さです。急いで積み上げたものより、じっくり時間をかけたものの方が、結果的にずっと長く持ちこたえてくれるでしょう。焦りを感じたときほど、深呼吸をして自分のペースを取り戻してください。急かされても自分のペースを守ることが、結果的に一番の近道になるタイミングです。`,
};

const LOVE_MODE_ADDENDUM: Record<PersonalityType, string> = {
  challenger: "今は特に、気持ちを溜め込まずまっすぐ伝えることで恋が動き出しやすいタイミングです。",
  seeker: "今は特に、相手をじっくり知ろうとする過程そのものを楽しめると、恋がより深まっていくタイミングです。",
  harmonizer: "今は特に、相手を気遣う気持ちが伝わりやすく、絆が深まりやすいタイミングです。",
  guardian: "今は特に、焦らず自分のペースで関係を育てることで、安心できる恋につながりやすいタイミングです。",
};

const WORK_MODE_ADDENDUM: Record<PersonalityType, string> = {
  challenger: "今は特に、新しい提案や挑戦が通りやすく、行動した分だけ結果につながりやすいタイミングです。",
  seeker: "今は特に、調べ物やリサーチが力を発揮しやすく、じっくり向き合った分だけ評価につながりやすいタイミングです。",
  harmonizer: "今は特に、周囲との連携がスムーズに進みやすく、チームプレーが評価されやすいタイミングです。",
  guardian: "今は特に、地道な積み重ねが信頼につながりやすく、着実さが評価されやすいタイミングです。",
};

const MODE_STRENGTH: Record<PersonalityType, string> = {
  challenger: "今は特に行動力が高まっている",
  seeker: "今は特に観察力・探究心が高まっている",
  harmonizer: "今は特に周囲への気配りが高まっている",
  guardian: "今は特に粘り強さ・安定感が高まっている",
};

const MODE_WEAKNESS: Record<PersonalityType, string> = {
  challenger: "今は特に勢い任せで見切り発車しやすい",
  seeker: "今は特に考えすぎて動き出しが遅れやすい",
  harmonizer: "今は特に自分のことを後回しにしやすい",
  guardian: "今は特に変化への一歩が重くなりやすい",
};

export type AdviceSection = {
  title: string;
  body: string;
};

export type FortuneResult = {
  title: string;
  reading: string;
  emoji: string;
  image: string;
  heroImageWide?: string;
  illustrations?: string[];
  essence: string;
  strengths: string[];
  weaknesses: string[];
  loveStyle: string;
  workStyle: string;
  compatibleWith: string;
  luckyColor: string;
  luckyItem: string;
  luckyAction: string;
  adviceSections: AdviceSection[];
};

export function buildFortuneResult(
  dateStr: string,
  personalityType: PersonalityType
): FortuneResult {
  const { godIndex, phaseIndex } = getGodAndPhase(dateStr);
  return buildFortuneResultFromIndices(godIndex, phaseIndex, personalityType);
}

export function buildFortuneResultFromIndices(
  godIndex: number,
  phaseIndex: number,
  personalityType: PersonalityType
): FortuneResult {
  const god = GODS[godIndex];
  const phase = PHASES[phaseIndex];

  const modeInfo = TYPE_INFO[personalityType];

  const adviceSections: AdviceSection[] = [
    {
      title: "🌙 今のあなたについて",
      body: `${god.personality} ${god.deepDive}`,
    },
    {
      title: `${modeInfo.emoji} 今のあなたのモード:${modeInfo.label}`,
      body: modeInfo.description,
    },
    {
      title: "⏳ 今という時期",
      body: `${phase.description} ${phase.deepDive}`,
    },
    {
      title: "🤍 今、大切にしたい関わり方",
      body: god.relationshipDeepDive,
    },
    {
      title: "🧭 今のあなたへの行動プラン",
      body: ACTION_PLANS[personalityType](god, phase),
    },
    {
      title: "✨ 最後に",
      body: `「${god.compatibleWith}」を象徴するような相手とは、足りない部分を補い合う心地よい関係を築きやすいでしょう。身近にそんな相手がいたら、少し意識して関わってみてください。反対に、似たタイプ同士で組むと、お互いの得意なことが重なりすぎて物足りなさを感じることもあるかもしれません。違いを面白がれる相手ほど、あなたの世界を広げてくれる存在になるはずです。ラッキーカラーは${god.luckyColor}、ラッキーアイテムは${god.luckyItem}です。普段の生活に取り入れることで、今のあなたの調子をそっと後押ししてくれるでしょう。身につけるものだけでなく、部屋に置く小物や、ふと目にする場所に取り入れてみるのもおすすめです。${phase.luckyAction} 占いの結果はあくまで一つの指針にすぎません。どんな結果であっても、それはあなたの中にある可能性の一面にすぎず、最終的にどう過ごすかを選ぶのは、いつだってあなた自身です。今のあなたに必要なのは、誰かと自分を比べることではなく、今日という一日をどう過ごしたいかに、正直になることかもしれません。今日という一日を、あなたらしいペースで大切に過ごしてください。`,
    },
  ];

  return {
    title: `${god.name}〜${phase.name}〜`,
    reading: `${god.reading} / ${phase.reading}`,
    emoji: god.emoji,
    image: god.image,
    heroImageWide: god.heroImageWide,
    illustrations: god.illustrations,
    essence: `${god.personality} ${phase.description}`,
    strengths: [...god.strengths, MODE_STRENGTH[personalityType]],
    weaknesses: [...god.weaknesses, MODE_WEAKNESS[personalityType]],
    loveStyle: `${god.loveStyle} ${LOVE_MODE_ADDENDUM[personalityType]}`,
    workStyle: `${god.workStyle} ${WORK_MODE_ADDENDUM[personalityType]}`,
    compatibleWith: god.compatibleWith,
    luckyColor: god.luckyColor,
    luckyItem: god.luckyItem,
    luckyAction: phase.luckyAction,
    adviceSections,
  };
}
