// WooCommerce product: 守護女神占い 詳しい鑑定結果 (id 16, virtual, hidden from catalog)
// Hitting add-to-cart while already on the cart page URL (rather than the
// homepage + redirect_to) guarantees landing on the cart with the item shown:
// this site's WooCommerce setup doesn't honor redirect_to, and add-to-cart
// from the homepage just re-renders the homepage — which, since the app is
// embedded there in an iframe, looked like clicking purchase did nothing but
// reload the fortune quiz.
export const PURCHASE_URL = "https://uranai.see-en.net/cart/?add-to-cart=16";
export const PURCHASE_PRICE_LABEL = "¥1,000";
