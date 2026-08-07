import { SunPosition, EclipticGeoMoon, SiderealTime } from "astronomy-engine";

export type Element = "fire" | "earth" | "air" | "water";

export type ZodiacSign = {
  name: string;
  emoji: string;
  element: Element;
  dateRange: string;
};

// index 0 = 牡羊座(Aries) ... 11 = 魚座(Pisces), matching ecliptic longitude / 30
export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: "牡羊座", emoji: "♈", element: "fire", dateRange: "3/21〜4/19" },
  { name: "牡牛座", emoji: "♉", element: "earth", dateRange: "4/20〜5/20" },
  { name: "双子座", emoji: "♊", element: "air", dateRange: "5/21〜6/21" },
  { name: "蟹座", emoji: "♋", element: "water", dateRange: "6/22〜7/22" },
  { name: "獅子座", emoji: "♌", element: "fire", dateRange: "7/23〜8/22" },
  { name: "乙女座", emoji: "♍", element: "earth", dateRange: "8/23〜9/22" },
  { name: "天秤座", emoji: "♎", element: "air", dateRange: "9/23〜10/23" },
  { name: "蠍座", emoji: "♏", element: "water", dateRange: "10/24〜11/22" },
  { name: "射手座", emoji: "♐", element: "fire", dateRange: "11/23〜12/21" },
  { name: "山羊座", emoji: "♑", element: "earth", dateRange: "12/22〜1/19" },
  { name: "水瓶座", emoji: "♒", element: "air", dateRange: "1/20〜2/18" },
  { name: "魚座", emoji: "♓", element: "water", dateRange: "2/19〜3/20" },
];

export type Prefecture = { name: string; lat: number; lon: number };

// 都道府県庁所在地の代表座標(緯度・経度)。上昇星座の算出のみに使用。
export const PREFECTURES: Prefecture[] = [
  { name: "北海道", lat: 43.0642, lon: 141.3469 },
  { name: "青森県", lat: 40.8244, lon: 140.7400 },
  { name: "岩手県", lat: 39.7036, lon: 141.1527 },
  { name: "宮城県", lat: 38.2688, lon: 140.8721 },
  { name: "秋田県", lat: 39.7186, lon: 140.1024 },
  { name: "山形県", lat: 38.2404, lon: 140.3633 },
  { name: "福島県", lat: 37.7500, lon: 140.4678 },
  { name: "茨城県", lat: 36.3418, lon: 140.4468 },
  { name: "栃木県", lat: 36.5658, lon: 139.8836 },
  { name: "群馬県", lat: 36.3912, lon: 139.0608 },
  { name: "埼玉県", lat: 35.8569, lon: 139.6489 },
  { name: "千葉県", lat: 35.6047, lon: 140.1233 },
  { name: "東京都", lat: 35.6895, lon: 139.6917 },
  { name: "神奈川県", lat: 35.4478, lon: 139.6425 },
  { name: "新潟県", lat: 37.9026, lon: 139.0236 },
  { name: "富山県", lat: 36.6953, lon: 137.2113 },
  { name: "石川県", lat: 36.5947, lon: 136.6256 },
  { name: "福井県", lat: 36.0652, lon: 136.2216 },
  { name: "山梨県", lat: 35.6642, lon: 138.5684 },
  { name: "長野県", lat: 36.6513, lon: 138.1810 },
  { name: "岐阜県", lat: 35.3912, lon: 136.7223 },
  { name: "静岡県", lat: 34.9769, lon: 138.3831 },
  { name: "愛知県", lat: 35.1802, lon: 136.9066 },
  { name: "三重県", lat: 34.7303, lon: 136.5086 },
  { name: "滋賀県", lat: 35.0045, lon: 135.8686 },
  { name: "京都府", lat: 35.0212, lon: 135.7556 },
  { name: "大阪府", lat: 34.6863, lon: 135.5200 },
  { name: "兵庫県", lat: 34.6913, lon: 135.1830 },
  { name: "奈良県", lat: 34.6851, lon: 135.8329 },
  { name: "和歌山県", lat: 34.2260, lon: 135.1675 },
  { name: "鳥取県", lat: 35.5039, lon: 134.2378 },
  { name: "島根県", lat: 35.4723, lon: 133.0505 },
  { name: "岡山県", lat: 34.6618, lon: 133.9350 },
  { name: "広島県", lat: 34.3966, lon: 132.4596 },
  { name: "山口県", lat: 34.1858, lon: 131.4714 },
  { name: "徳島県", lat: 34.0658, lon: 134.5593 },
  { name: "香川県", lat: 34.3401, lon: 134.0434 },
  { name: "愛媛県", lat: 33.8417, lon: 132.7657 },
  { name: "高知県", lat: 33.5597, lon: 133.5311 },
  { name: "福岡県", lat: 33.6064, lon: 130.4181 },
  { name: "佐賀県", lat: 33.2494, lon: 130.2989 },
  { name: "長崎県", lat: 32.7448, lon: 129.8737 },
  { name: "熊本県", lat: 32.7898, lon: 130.7417 },
  { name: "大分県", lat: 33.2382, lon: 131.6126 },
  { name: "宮崎県", lat: 31.9111, lon: 131.4239 },
  { name: "鹿児島県", lat: 31.5602, lon: 130.5581 },
  { name: "沖縄県", lat: 26.2124, lon: 127.6809 },
];

export const DEFAULT_PREFECTURE_INDEX = PREFECTURES.findIndex((p) => p.name === "東京都");

function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function eclipticLonToSignIndex(elonDeg: number): number {
  return Math.floor(normalizeDeg(elonDeg) / 30);
}

export function getSunSignIndex(utcDate: Date): number {
  return eclipticLonToSignIndex(SunPosition(utcDate).elon);
}

export function getMoonSignIndex(utcDate: Date): number {
  return eclipticLonToSignIndex(EclipticGeoMoon(utcDate).lon);
}

// 平均黄道傾角(度)。J2000.0からのユリウス世紀数Tによる標準的な近似式。
// 占い用途の精度では十分なため、章動(nutation)は無視した平均値を用いる。
function meanObliquityDeg(utcDate: Date): number {
  const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  const T = (utcDate.getTime() - J2000) / (1000 * 60 * 60 * 24 * 36525);
  return (
    23.43929111 -
    0.013004167 * T -
    0.0000001639 * T * T +
    0.0000005036 * T * T * T
  );
}

// アセンダント(上昇星座)を、地方恒星時・黄道傾角・出生地の緯度から算出する。
// 標準的な占星術の公式: tan(Asc) = -cos(RAMC) / (sin(RAMC)cos(ε) + tan(φ)sin(ε))
export function getAscendantIndex(
  utcDate: Date,
  latDeg: number,
  lonDeg: number
): number {
  const gstHours = SiderealTime(utcDate); // グリニッジ恒星時(0〜24h)
  const lstDeg = normalizeDeg(gstHours * 15 + lonDeg); // 地方恒星時(度)
  const ramc = (lstDeg * Math.PI) / 180;
  const eps = (meanObliquityDeg(utcDate) * Math.PI) / 180;
  const phi = (latDeg * Math.PI) / 180;

  const y = -Math.cos(ramc);
  const x = Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps);
  const ascDeg = normalizeDeg((Math.atan2(y, x) * 180) / Math.PI);
  return eclipticLonToSignIndex(ascDeg);
}

// 出生地の現地時刻(日本標準時 UTC+9固定)をUTCのDateに変換する。
export function birthLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): Date {
  return new Date(Date.UTC(year, month - 1, day, hour - 9, minute));
}

export type BirthInput = {
  year: number;
  month: number;
  day: number;
  hour: number | null;
  minute: number | null;
  prefectureIndex: number;
};

export type BirthChart = {
  sunIndex: number;
  moonIndex: number;
  risingIndex: number | null;
  timeKnown: boolean;
};

export function computeBirthChart(input: BirthInput): BirthChart {
  const timeKnown = input.hour !== null && input.minute !== null;
  const hour = timeKnown ? (input.hour as number) : 12;
  const minute = timeKnown ? (input.minute as number) : 0;
  const utc = birthLocalToUtc(input.year, input.month, input.day, hour, minute);

  const sunIndex = getSunSignIndex(utc);
  const moonIndex = getMoonSignIndex(utc);

  let risingIndex: number | null = null;
  if (timeKnown) {
    const pref = PREFECTURES[input.prefectureIndex] ?? PREFECTURES[DEFAULT_PREFECTURE_INDEX];
    risingIndex = getAscendantIndex(utc, pref.lat, pref.lon);
  }

  return { sunIndex, moonIndex, risingIndex, timeKnown };
}

export type SignContent = { title: string; body: string };

// 太陽星座: 性格の核・生きる原動力
export const SUN_TEXTS: SignContent[] = [
  {
    title: "情熱で道を切り拓くタイプ",
    body: "太陽が牡羊座にあるあなたは、迷う前に動き出す行動力が持ち味。物事の「一番手」になることに喜びを感じ、新しい挑戦ほど力が湧いてきます。まっすぐな気性は周囲を巻き込む推進力になりますが、勢い余って周りが見えなくなることも。結果を焦らず、一歩踏み出した後の粘りを意識すると、持ち前のパワーがより大きな実りにつながります。",
  },
  {
    title: "着実さで信頼を築くタイプ",
    body: "太陽が牡牛座にあるあなたは、じっくり時間をかけて積み上げる安定感が魅力。五感で確かめられる心地よさや美しさを大切にし、一度決めた道は簡単には揺らぎません。その粘り強さは周囲から厚い信頼を集めますが、変化への抵抗が強くなりすぎることも。時には流れに身を任せる柔らかさを持つと、豊かさがより自然に巡ってきます。",
  },
  {
    title: "好奇心で世界を広げるタイプ",
    body: "太陽が双子座にあるあなたは、軽やかな知的好奇心と会話の巧みさが武器。一つの物事に留まるより、多方面にアンテナを張って情報や人をつなげることに才能を発揮します。フットワークの軽さは魅力ですが、興味が移ろいやすく物事が中途半端になりがちな面も。一つを深める時間を意識的に作ると、持ち味の広さに厚みが加わります。",
  },
  {
    title: "共感力で人を包み込むタイプ",
    body: "太陽が蟹座にあるあなたは、身近な人を大切に守りたいという情の深さが核にあります。家庭的な安心感を作るのが得意で、相手の気持ちを察する繊細さは周囲を癒します。一方で情に流されやすく、傷つきやすい一面も。自分自身の心も同じように労わる時間を持つと、その優しさがより長く続く力になります。",
  },
  {
    title: "華やかさで場を照らすタイプ",
    body: "太陽が獅子座にあるあなたは、堂々とした存在感と表現力で周囲を惹きつけます。自分らしさを表に出すことにためらいがなく、人の中心に立つほど生き生きとする性質。頼れるリーダーになれる一方、注目されないと不安定になりがちな面も。他人の輝きを認める余裕を持つと、あなた自身の輝きもより自然に増していきます。",
  },
  {
    title: "誠実さで物事を整えるタイプ",
    body: "太陽が乙女座にあるあなたは、細やかな観察力と誠実な仕事ぶりが持ち味。物事の粗を見抜き、丁寧に整えていく力に長けています。完璧を目指すあまり自分にも他人にも厳しくなりがちですが、その分だけ周囲からの信頼は厚いもの。「六割できれば十分」と力を抜く余白を持つと、才能がより長く活きます。",
  },
  {
    title: "調和で関係を築くタイプ",
    body: "太陽が天秤座にあるあなたは、対立よりも調和を選ぶバランス感覚の持ち主。人と人との間に立ち、公平な視点で物事を進める才能があります。周囲からは「センスがいい人」として頼られますが、決断を先延ばしにしがちな面も。自分の本音を先に決めてから相手と向き合うと、調和と自分らしさを両立できます。",
  },
  {
    title: "探究心で本質に迫るタイプ",
    body: "太陽が蠍座にあるあなたは、物事の表面ではなく核心を見抜こうとする集中力の持ち主。一度心を許した相手には深い愛情を注ぎ、簡単には人を裏切りません。その分だけ疑い深く、白黒つけたがる面もありますが、それは物事を軽く扱わない誠実さの裏返し。信頼できる相手には少しずつ心を開いていくと、深い絆が育ちます。",
  },
  {
    title: "自由な探求で視野を広げるタイプ",
    body: "太陽が射手座にあるあなたは、既知の枠を飛び出して新しい世界を求める冒険心の持ち主。楽観的でおおらかな性格は、周囲に希望や勇気を与えます。自由を愛するあまり、約束や細部への配慮がおろそかになることも。大きな目標と同じくらい、日々の小さな約束も大切にすると、信頼と自由の両方を手にできます。",
  },
  {
    title: "責任感で成果を積み上げるタイプ",
    body: "太陽が山羊座にあるあなたは、地に足のついた計画性と責任感の強さが核にあります。目標に向かって着実に努力を重ね、周囲からは「頼れる大人」として一目置かれる存在。真面目さゆえに自分を追い込みすぎる傾向もありますが、その積み重ねは必ず社会的な実りになります。時には結果を急がず、過程そのものを楽しむ余裕を持ちましょう。",
  },
  {
    title: "独自の視点で未来を描くタイプ",
    body: "太陽が水瓶座にあるあなたは、常識にとらわれない自由な発想と客観性が持ち味。個人の枠を超えて、社会や未来のことを考える視野の広さがあります。人とは違う視点を持つ分、孤立しやすい一面もありますが、それはあなたにしか見えない景色を持っている証。同じ志を持つ仲間を見つけると、その独自性がより大きな力に変わります。",
  },
  {
    title: "感受性で世界を包み込むタイプ",
    body: "太陽が魚座にあるあなたは、境界を溶かして相手の気持ちに寄り添う繊細な感受性の持ち主。芸術的な感性や共感力に恵まれ、人の心を癒す力があります。一方で現実と理想の境目が曖昧になりやすく、流されやすい面も。自分だけの居場所や時間を意識的に確保すると、その優しさをすり減らさずに発揮し続けられます。",
  },
];

// 月星座: 感情の動き方・心が安らぐ場所
export const MOON_TEXTS: SignContent[] = [
  { title: "感情がまっすぐに動く", body: "月が牡羊座にあるあなたは、喜怒哀楽がストレートに表に出るタイプ。気持ちを溜め込むよりも、その場ですぐに発散する方が心が安定します。体を動かしたり、新しいことに挑戦する時間が何よりの癒しになります。" },
  { title: "安定と心地よさを求める", body: "月が牡牛座にあるあなたは、変化の少ない穏やかな環境で心が満たされます。美味しいもの、心地よい肌触り、慣れ親しんだ場所——五感を満たす時間が最大のリラックス法。無理に感情を急かされると疲れてしまうので、自分のペースを守ることが大切です。" },
  { title: "言葉にして気持ちを整理する", body: "月が双子座にあるあなたは、誰かに話す・文字にすることで感情を整理するタイプ。一人で抱え込むより、気軽に話せる相手が複数いると心が安定します。ただし気持ちの切り替えが早い分、本音を後回しにしがちな面も自覚しておくと良いでしょう。" },
  { title: "身近な人との絆で満たされる", body: "月が蟹座にあるあなたは、家族や親しい人とのつながりの中で最も安心できるタイプ。感情の動きが繊細で、相手の気分にも敏感に共鳴します。安心できる「帰る場所」があるかどうかが、心の安定を大きく左右します。" },
  { title: "認められることで満たされる", body: "月が獅子座にあるあなたは、自分の気持ちを堂々と表現し、それを誰かに受け止めてもらえた時に心から満たされます。感情表現が豊かで、感謝や賞賛の言葉が何よりの栄養に。自分から気持ちを素直に伝える練習をすると、より安定します。" },
  { title: "整えることで心を落ち着ける", body: "月が乙女座にあるあなたは、身の回りを整理したり、やるべきことをこなすことで心が落ち着くタイプ。感情そのものより「役に立てているか」が安心材料になります。頑張りすぎたら、あえて何もしない時間を意識的に作りましょう。" },
  { title: "心地よい関係の中で安らぐ", body: "月が天秤座にあるあなたは、誰かと穏やかに調和している時に最も安心します。一人よりも二人、対立よりも和やかな空気を好み、美しいものに触れると心が満たされます。本音を飲み込みすぎないよう、時には自分の気持ちを優先する練習も必要です。" },
  { title: "深く濃い感情を大切にする", body: "月が蠍座にあるあなたは、表面的な付き合いより、深く濃い感情のやり取りを求めるタイプ。心を許した相手には強い愛着を持ち、簡単には手放しません。感情の起伏が激しく見えることもありますが、それだけ物事に本気で向き合っている証です。" },
  { title: "自由と広がりの中で満たされる", body: "月が射手座にあるあなたは、心が閉じ込められることを何より嫌い、自由に動ける状況で安定するタイプ。旅行や新しい体験、笑いのある時間が心の栄養になります。束縛されそうになると気持ちが不安定になりやすいので、適度な距離感を大切にしましょう。" },
  { title: "役割を果たすことで安心する", body: "月が山羊座にあるあなたは、感情をあまり表に出さず、やるべきことを淡々とこなすことで心を保つタイプ。責任を果たしている実感が安心につながります。一方で弱さを見せるのが苦手なので、信頼できる相手には素直に甘えることも大切です。" },
  { title: "独立した心の距離感を保つ", body: "月が水瓶座にあるあなたは、感情に流されるよりも一歩引いて客観的に眺めるタイプ。友人的な関係性や、自分の時間・空間が確保されていることで安定します。急に距離を詰められると心が離れやすいので、自分のペースを尊重してもらえる関係が理想です。" },
  { title: "共感の中で心を溶かす", body: "月が魚座にあるあなたは、相手の感情と自分の感情が溶け合うほど深く共感するタイプ。音楽や自然、芸術に触れる時間が心を癒します。他人の感情に引きずられやすいので、一人で心を休める時間を意識的に確保することが安定につながります。" },
];

// 上昇星座(アセンダント): 第一印象・外に見える顔
export const RISING_TEXTS: SignContent[] = [
  { title: "エネルギッシュな第一印象", body: "アセンダントが牡羊座のあなたは、初対面でも快活でエネルギッシュな印象を与えます。行動が早く、話し方にも勢いがあるため「頼りになりそう」「裏表がなさそう」と思われやすいタイプです。" },
  { title: "落ち着いた安心感のある第一印象", body: "アセンダントが牡牛座のあなたは、初対面でも落ち着いていて安心感のある佇まいが印象的です。急かされても動じない雰囲気から「マイペースで芯がある人」と見られやすいでしょう。" },
  { title: "軽やかで話しやすい第一印象", body: "アセンダントが双子座のあなたは、明るく話しやすい雰囲気で場の空気を軽くします。初対面での会話のテンポが良く「気さくで頭の回転が速そう」という印象を持たれやすいタイプです。" },
  { title: "柔らかく温かい第一印象", body: "アセンダントが蟹座のあなたは、初対面でもどこか懐かしいような温かい雰囲気を漂わせます。人見知りに見えても実は面倒見が良く「優しそう」「話を聞いてくれそう」と思われやすいでしょう。" },
  { title: "華やかで堂々とした第一印象", body: "アセンダントが獅子座のあなたは、初対面から堂々とした存在感を放ちます。表情や仕草が豊かで「自信がありそう」「リーダーシップがありそう」という印象を与えやすいタイプです。" },
  { title: "きちんとした誠実な第一印象", body: "アセンダントが乙女座のあなたは、身だしなみや言葉遣いが丁寧で「きちんとした人」という印象を持たれやすいタイプ。控えめに見えても、細やかな気配りが初対面から伝わります。" },
  { title: "洗練された感じのいい第一印象", body: "アセンダントが天秤座のあなたは、立ち振る舞いが自然で「感じがいい」「センスがある」と思われやすいタイプ。誰に対しても公平で穏やかな態度が、初対面の緊張を和らげます。" },
  { title: "ミステリアスで印象に残る第一印象", body: "アセンダントが蠍座のあなたは、多くを語らなくても存在感があり「ミステリアス」「何か芯を持っていそう」という印象を残します。目力が強く、一度会うと忘れられない人になりやすいでしょう。" },
  { title: "開放的で明るい第一印象", body: "アセンダントが射手座のあなたは、屈託のない笑顔とオープンな態度で「一緒にいて楽しそう」という印象を与えます。物怖じしない態度は、初対面の相手の緊張もほぐしてくれます。" },
  { title: "落ち着いた大人びた第一印象", body: "アセンダントが山羊座のあなたは、実年齢より落ち着いて見られやすく「しっかりしていそう」「信頼できそう」という印象を持たれます。控えめな態度の奥に、揺るがない意志の強さが感じられるタイプです。" },
  { title: "個性的でユニークな第一印象", body: "アセンダントが水瓶座のあなたは、どこか他の人とは違う個性が初対面から伝わり「面白そう」「独特のセンスがありそう」という印象を残します。型にはまらない自由な雰囲気が魅力です。" },
  { title: "柔らかく夢見がちな第一印象", body: "アセンダントが魚座のあなたは、ふんわりとした柔らかい雰囲気で「優しそう」「癒される」という印象を与えます。表情豊かで感受性が伝わりやすく、初対面でも警戒されにくいタイプです。" },
];

export type AstrologyResult = {
  sunIndex: number;
  moonIndex: number;
  risingIndex: number | null;
  sun: ZodiacSign;
  moon: ZodiacSign;
  rising: ZodiacSign | null;
  sunText: SignContent;
  moonText: SignContent;
  risingText: SignContent | null;
};

export function buildAstrologyResult(
  sunIndex: number,
  moonIndex: number,
  risingIndex: number | null
): AstrologyResult {
  return {
    sunIndex,
    moonIndex,
    risingIndex,
    sun: ZODIAC_SIGNS[sunIndex],
    moon: ZODIAC_SIGNS[moonIndex],
    rising: risingIndex !== null ? ZODIAC_SIGNS[risingIndex] : null,
    sunText: SUN_TEXTS[sunIndex],
    moonText: MOON_TEXTS[moonIndex],
    risingText: risingIndex !== null ? RISING_TEXTS[risingIndex] : null,
  };
}
