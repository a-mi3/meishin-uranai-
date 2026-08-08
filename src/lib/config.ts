// WordPress page letting the customer choose between the Web-only product
// (id 16, ¥1,000, virtual, hidden from catalog) and the mail-order product
// (id 36, ¥3,000, includes a physical reading booklet + postcard) before
// adding either to the cart. Each product's add-to-cart link on that page
// uses target="_top" + the cart page URL directly (not the homepage +
// redirect_to): this site's WooCommerce setup doesn't honor redirect_to,
// and add-to-cart from the homepage just re-renders the homepage — which,
// since the app is embedded there in an iframe, looked like clicking
// purchase did nothing but reload the fortune quiz.
export const PURCHASE_URL = "https://uranai.see-en.net/purchase/";
export const PURCHASE_PRICE_LABEL = "¥1,000〜";

// 本格占星術鑑定書(商品ID 90、¥1,800、バーチャル、カタログ非表示)のカートページへ
// 直接追加するリンク。守護女神占いと違い郵送版が無い単一商品のため、
// /purchase/ のような選択ページを介さずカートページに直接遷移する。
export const ASTROLOGY_PURCHASE_URL = "https://uranai.see-en.net/cart/?add-to-cart=90";
export const ASTROLOGY_PURCHASE_PRICE_LABEL = "¥1,800";

// LIFF app: 守護女神占い LIFF (LINE Login channel, endpoint https://uranai.see-en.net/app/)
export const LIFF_ID: string = "2010783988-Oitaw9XW";
