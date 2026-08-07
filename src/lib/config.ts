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

// TODO: 本格占星術鑑定書用のWooCommerce商品・購入導線ページがまだ無いため、
// 暫定的に守護女神占いと同じ購入選択ページを指している。商品公開後に
// 専用URL・価格ラベルへ差し替えること。
export const ASTROLOGY_PURCHASE_URL = "https://uranai.see-en.net/purchase/";
export const ASTROLOGY_PURCHASE_PRICE_LABEL = "¥1,800〜";

// LIFF app: 守護女神占い LIFF (LINE Login channel, endpoint https://uranai.see-en.net/app/)
export const LIFF_ID: string = "2010783988-Oitaw9XW";
