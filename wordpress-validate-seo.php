<?php
/**
 * Plugin Name: SEO Validation
 * Plugin URI: https://github.com/octaviotron/wordpress-validate-seo
 * Description: Prevent publishing if Yoast SEO focus keyphrase is missing.
 * Version: 0.1.6
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Octavio Rossell
 * Author URI: https://github.com/octaviotron
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: wordpress-validate-seo
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'WORDPRESS_VALIDATE_SEO_VERSION', '0.1.6' );

/**
 * Load plugin textdomain.
 */
function wordpress_validate_seo_load_textdomain() {
    load_plugin_textdomain(
        'wordpress-validate-seo',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'init', 'wordpress_validate_seo_load_textdomain' );

/**
 * Enqueue Block Editor assets.
 */
function wordpress_validate_seo_enqueue_block_editor_assets() {
    $screen = get_current_screen();
    
    // Only load on 'post' post type.
    if ( ! $screen || 'post' !== $screen->post_type ) {
        return;
    }

    $script_path = 'js/editor.js';
    $script_asset_path = plugin_dir_path( __FILE__ ) . $script_path;
    $version = file_exists( $script_asset_path ) ? filemtime( $script_asset_path ) : WORDPRESS_VALIDATE_SEO_VERSION;

    $dependencies = array(
        'wp-plugins',
        'wp-edit-post',
        'wp-editor',
        'wp-element',
        'wp-data',
        'wp-components',
        'wp-i18n',
    );

    wp_enqueue_script(
        'wordpress-validate-seo-script',
        plugins_url( $script_path, __FILE__ ),
        $dependencies,
        $version,
        true
    );

    wp_set_script_translations(
        'wordpress-validate-seo-script',
        'wordpress-validate-seo',
        plugin_dir_path( __FILE__ ) . 'languages'
    );
}
add_action( 'enqueue_block_editor_assets', 'wordpress_validate_seo_enqueue_block_editor_assets' );
