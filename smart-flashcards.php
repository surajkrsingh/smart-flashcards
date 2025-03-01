<?php
/**
 * Smart Flashcards
 *
 * @package           smart-flashcards
 * @author            SurajWP
 * @copyright         2025 by SurajWP
 * @license           GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name:       Smart Flashcards
 * Plugin URI:        https://surajwp.com/smart-flashcards/
 * Description:       Simple flashcards
 * Version:           1.0.0
 * Requires PHP:      7.4
 * Requires at least: 5.8
 * Author:            SurajWP
 * Author URI:        https://surajwp.com/
 * Text Domain:       smart-flashcards
 * Domain Path:       /languages
 *
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Tags:              Flashcards
 */

// If this file called directly then abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Constant as plugin version.
 */
if ( ! defined( 'SMFCS_PLUGIN_VERSION' ) ) {
	define( 'SMFCS_PLUGIN_VERSION', '1.0.0' );
}

/**
 * Constant as plugin file.
 */
if ( ! defined( 'SMFCS_PLUGIN_FILE' ) ) {
	define( 'SMFCS_PLUGIN_FILE', plugin_dir_path( __FILE__ ) . 'smart-flashcards.php' );
}

/**
 * Constant as dir of plugin.
 */
if ( ! defined( 'SMFCS_PLUGIN_DIR_NAME' ) ) {
	define( 'SMFCS_PLUGIN_DIR_NAME', untrailingslashit( dirname( plugin_basename( __FILE__ ) ) ) );
}

/**
 * Constant as plugin path.
 */
if ( ! defined( 'SMFCS_PLUGIN_PATH' ) ) {
	define( 'SMFCS_PLUGIN_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
}

/**
 * Constant as plugin URL.
 */
if ( ! defined( 'SMFCS_PLUGIN_URL' ) ) {
	define( 'SMFCS_PLUGIN_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );
}

/**
 * Constant as URI of assets build.
 */
if ( ! defined( 'SMFCS_PLUGIN_BUILD_URI' ) ) {
	define( 'SMFCS_PLUGIN_BUILD_URI', SMFCS_PLUGIN_URL . '/build' );
}

/**
 * Constant as dir of assets build.
 */
if ( ! defined( 'SMFCS_PLUGIN_BUILD_DIR' ) ) {
	define( 'SMFCS_PLUGIN_BUILD_DIR', SMFCS_PLUGIN_PATH . '/build' );
}

/**
 * Constant as path of template file.
 */
if ( ! defined( 'SMFCS_PLUGIN_TEMPLATE_PATH' ) ) {
	define( 'SMFCS_PLUGIN_TEMPLATE_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/templates/' );
}

/** Include the required files only*/
require_once SMFCS_PLUGIN_PATH . '/inc/helpers/autoloader.php';
require_once SMFCS_PLUGIN_PATH . '/inc/helpers/custom-functions.php';
require_once SMFCS_PLUGIN_PATH . '/inc/classes/class-single-post-display-block.php';

/**
 * To load plugin main class.
 *
 * @return void
 */
function smfcs_main_class_loader() {
	\SMFCS\Features\Inc\Smart_Flashcards::get_instance();
	\SMFCS\Features\Inc\Single_Post_Display_Block::get_instance();
}

smfcs_main_class_loader();
