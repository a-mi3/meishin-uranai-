<?php
/**
 * Plugin Name: Uranai Result Logger
 * Description: 占いアプリ群（守護女神占い・恋愛心理タイプ診断・姓名判断・占星術）の診断結果を記録し、
 *              WooCommerce注文とセッションIDで紐づけるための軽量ロガー。mu-pluginとして配置。
 */

defined('ABSPATH') || exit;

// --- テーブル作成 ---
function uranai_log_ensure_table() {
    global $wpdb;
    $table = $wpdb->prefix . 'uranai_result_log';
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE IF NOT EXISTS $table (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME NOT NULL,
        app VARCHAR(50) NOT NULL,
        session_id VARCHAR(64) NOT NULL,
        stage VARCHAR(20) NOT NULL,
        summary TEXT NULL,
        result_data LONGTEXT NULL,
        ip VARCHAR(64) NULL,
        KEY session_id (session_id),
        KEY app (app)
    ) $charset_collate;";
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
}
add_action('init', 'uranai_log_ensure_table');

// --- 簡易レート制限 (IPごと1時間30件まで) ---
function uranai_log_rate_limited($ip) {
    $key = 'uranai_log_rl_' . md5($ip);
    $count = (int) get_transient($key);
    if ($count >= 30) {
        return true;
    }
    set_transient($key, $count + 1, HOUR_IN_SECONDS);
    return false;
}

// --- REST API ---
add_action('rest_api_init', function () {
    register_rest_route('uranai-log/v1', '/log', [
        'methods' => 'POST',
        'callback' => 'uranai_log_create',
        'permission_callback' => '__return_true',
    ]);
    register_rest_route('uranai-log/v1', '/log', [
        'methods' => 'GET',
        'callback' => 'uranai_log_list',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        },
    ]);
});

function uranai_log_create(WP_REST_Request $request) {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';
    if (uranai_log_rate_limited($ip)) {
        return new WP_Error('rate_limited', 'Too many requests', ['status' => 429]);
    }

    $params = $request->get_json_params();
    if (!is_array($params)) {
        return new WP_Error('invalid_body', 'Invalid JSON body', ['status' => 400]);
    }

    $allowed_apps = ['meishin', 'astrology', 'renai', 'seimei'];
    $app = sanitize_text_field($params['app'] ?? '');
    if (!in_array($app, $allowed_apps, true)) {
        return new WP_Error('invalid_app', 'Invalid app', ['status' => 400]);
    }

    $session_id = sanitize_text_field($params['session_id'] ?? '');
    if (strlen($session_id) < 8 || strlen($session_id) > 64) {
        return new WP_Error('invalid_session', 'Invalid session_id', ['status' => 400]);
    }

    $stage = sanitize_text_field($params['stage'] ?? '');
    if (!in_array($stage, ['free', 'unlocked'], true)) {
        return new WP_Error('invalid_stage', 'Invalid stage', ['status' => 400]);
    }

    $summary = mb_substr(sanitize_text_field($params['summary'] ?? ''), 0, 500);

    $result_data = null;
    if (isset($params['result_data'])) {
        $encoded = wp_json_encode($params['result_data']);
        if ($encoded !== false) {
            $result_data = mb_substr($encoded, 0, 8000);
        }
    }

    global $wpdb;
    $table = $wpdb->prefix . 'uranai_result_log';
    $wpdb->insert($table, [
        'created_at' => current_time('mysql'),
        'app' => $app,
        'session_id' => $session_id,
        'stage' => $stage,
        'summary' => $summary,
        'result_data' => $result_data,
        'ip' => $ip,
    ]);

    return ['success' => true];
}

function uranai_log_list(WP_REST_Request $request) {
    global $wpdb;
    $table = $wpdb->prefix . 'uranai_result_log';
    $session_id = sanitize_text_field($request->get_param('session_id') ?? '');
    if ($session_id) {
        $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE session_id = %s ORDER BY id DESC", $session_id));
    } else {
        $rows = $wpdb->get_results("SELECT * FROM $table ORDER BY id DESC LIMIT 200");
    }
    return $rows;
}

// --- WooCommerce: セッションIDをカート経由で注文に紐づける ---
add_filter('woocommerce_add_cart_item_data', function ($cart_item_data, $product_id, $variation_id) {
    if (!empty($_REQUEST['session_id'])) {
        $cart_item_data['uranai_session_id'] = sanitize_text_field(wp_unslash($_REQUEST['session_id']));
    }
    return $cart_item_data;
}, 10, 3);

add_action('woocommerce_checkout_create_order_line_item', function ($item, $cart_item_key, $values, $order) {
    if (!empty($values['uranai_session_id'])) {
        $item->add_meta_data('_uranai_session_id', $values['uranai_session_id'], true);
    }
}, 10, 4);

// woocommerce_checkout_update_order_meta は旧来のショートコード式チェックアウト
// でのみ発火し、このサイトのようにBlocks/Store API方式のチェックアウト(「支払い」
// ページがReact製)では呼ばれないことが判明したため使用しない。
// woocommerce_checkout_order_created は注文オブジェクトが生成された直後(まだ
// 明細行が追加される前)に発火するため、この時点では $order->get_items() が
// 空でコピーできないことが判明した。
// woocommerce_checkout_order_processed も試したが、実際に診断購入(テスト注文105)
// で検証したところ発火していない(明細行メタは正しく付くが注文レベルは空のまま)。
// これはこのサイトのチェックアウトがWooCommerce Blocks(Store API)経由であり、
// クラシックのチェックアウトフックが一切発火しないため。Store APIには専用の
// woocommerce_store_api_checkout_order_processed が用意されているので、
// 両方登録しておく(クラシック導線が復活しても壊れないように)。
function uranai_copy_session_id_to_order($order) {
    if (!$order || $order->get_meta('_uranai_session_id')) {
        return;
    }
    foreach ($order->get_items() as $item) {
        $sid = $item->get_meta('_uranai_session_id');
        if ($sid) {
            $order->update_meta_data('_uranai_session_id', $sid);
            $order->save();
            break;
        }
    }
}

add_action('woocommerce_checkout_order_processed', function ($order_id) {
    uranai_copy_session_id_to_order(wc_get_order($order_id));
});

add_action('woocommerce_store_api_checkout_order_processed', function ($order) {
    uranai_copy_session_id_to_order($order);
});

function uranai_get_order_session_id($order) {
    $sid = $order->get_meta('_uranai_session_id');
    if ($sid) {
        return $sid;
    }
    // 古い注文など、注文レベルのメタが無い場合は明細行メタにフォールバック。
    foreach ($order->get_items() as $item) {
        $item_sid = $item->get_meta('_uranai_session_id');
        if ($item_sid) {
            return $item_sid;
        }
    }
    return '';
}

add_action('woocommerce_admin_order_data_after_order_details', function ($order) {
    $sid = uranai_get_order_session_id($order);
    if ($sid) {
        echo '<p><strong>診断セッションID:</strong> <code>' . esc_html($sid) . '</code><br><span style="color:#777;font-size:12px;">「占い結果ログ」管理画面でこのIDを検索すると、購入者が見た診断結果を確認できます。</span></p>';
    }
});

// --- 管理画面: 結果ログ一覧 ---
add_action('admin_menu', function () {
    add_menu_page('占い結果ログ', '占い結果ログ', 'manage_options', 'uranai-result-log', 'uranai_log_admin_page', 'dashicons-list-view', 58);
});

function uranai_log_admin_page() {
    if (!current_user_can('manage_options')) {
        return;
    }
    global $wpdb;
    $table = $wpdb->prefix . 'uranai_result_log';

    $search_session = isset($_GET['session_id']) ? sanitize_text_field(wp_unslash($_GET['session_id'])) : '';
    if ($search_session) {
        $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE session_id = %s ORDER BY id DESC", $search_session));
    } else {
        $rows = $wpdb->get_results("SELECT * FROM $table ORDER BY id DESC LIMIT 300");
    }

    $app_labels = [
        'meishin' => '守護女神占い',
        'astrology' => '本格占星術鑑定書',
        'renai' => '恋愛心理タイプ診断',
        'seimei' => '姓名判断',
    ];

    echo '<div class="wrap"><h1>占い結果ログ</h1>';
    echo '<p>各アプリで診断された結果の記録です。WooCommerce注文の編集画面に表示される「診断セッションID」を、下の検索欄に入力すると、その注文の人が見た結果だけに絞り込めます。</p>';
    echo '<form method="get" style="margin-bottom:16px;"><input type="hidden" name="page" value="uranai-result-log" />';
    echo '<input type="text" name="session_id" value="' . esc_attr($search_session) . '" placeholder="セッションIDで絞り込み" style="width:320px;" /> ';
    echo '<button class="button">検索</button>';
    if ($search_session) {
        echo ' <a class="button" href="' . esc_url(admin_url('admin.php?page=uranai-result-log')) . '">クリア</a>';
    }
    echo '</form>';

    echo '<table class="widefat striped"><thead><tr><th style="width:160px;">日時</th><th style="width:140px;">アプリ</th><th style="width:80px;">段階</th><th>概要</th><th style="width:220px;">セッションID</th></tr></thead><tbody>';
    if (empty($rows)) {
        echo '<tr><td colspan="5">記録がありません。</td></tr>';
    }
    foreach ($rows as $row) {
        printf(
            '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td><code>%s</code></td></tr>',
            esc_html($row->created_at),
            esc_html($app_labels[$row->app] ?? $row->app),
            esc_html($row->stage === 'unlocked' ? '購入後' : '無料'),
            esc_html($row->summary),
            esc_html($row->session_id)
        );
    }
    echo '</tbody></table></div>';
}
