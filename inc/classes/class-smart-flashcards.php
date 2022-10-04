<?php
/**
 * Smart_Flashcards class.
 *
 * @package smart-flashcards
 */

namespace SMFCS\Features\Inc;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use SMFCS\Features\Inc\Traits\Singleton;

/**
 * Class Smart_Flashcards
 */
class Smart_Flashcards {

	use Singleton;

	/**
	 * Construct method.
	 */
	public function __construct() {
		// Load plugin classes.
		//Admin_Settings::get_instance();

		$this->setup_hooks();
	}

	/**
	 * To setup action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {
		register_activation_hook( SMFCS_PLUGIN_FILE, [ $this, 'plugin_activation' ] );
		register_deactivation_hook( SMFCS_PLUGIN_FILE, [ $this, 'plugin_deactivation' ] );

		add_action( 'plugins_loaded', [ $this, 'load_plugin_text_domain' ] );
		add_action( 'admin_init', [ $this, 'check_php_version' ] );

		add_action( 'init', [ $this, 'create_smart_flashcards_init' ] );
	}

	/**
	 * Activation of plugin.
	 *
	 * @return void
	 */
	public function plugin_activation() {
		do_action( 'smfcs_plugin_activate' );
		flush_rewrite_rules();
	}

	/**
	 * Deactivation of plugin.
	 *
	 * @return void
	 */
	public function plugin_deactivation() {
		do_action( 'smfcs_plugin_deactivate' );
		flush_rewrite_rules();
	}

	/**
	 * Check PHP version required for this plugin.
	 */
	public function check_php_version() {
		if ( version_compare( PHP_VERSION, '5.8', '<' ) ) {
			add_action( 'admin_notices', array( $this, 'plugin_deactivation_notice' ) );
			deactivate_plugins( plugin_basename( SMFCS_PLUGIN_FILE ) );
		}
	}

	/**
	 * Create admin notices for PHP version required.
	 */
	public function plugin_deactivation_notice() {
		$message = __( 'Smart Flashcards requires PHP 5.8 or higher to function and has therefore been automatically disabled. You are still on ' . PHP_VERSION . '. Please speak to your web host about upgrading your PHP version.', 'smart-flashcards' );
		printf(
			'<div class="error"><p> %s </p></div>',
			esc_html( $message )
		);
	}

	/**
	 * Load plugin text domain.
	 *
	 * @version 2.0.0
	 * @return void
	 */
	public function load_plugin_text_domain() {
		load_plugin_textdomain( 'smart-flashcards', false, SMFCS_PLUGIN_DIR_NAME . '/languages' );
	}

	/**
	 * Create block init.
	 *
	 * @version 1.0.0
	 * @return void
	 */
	public function create_smart_flashcards_init() {
		register_block_type( SMFCS_PLUGIN_BUILD_DIR );
	}
}
