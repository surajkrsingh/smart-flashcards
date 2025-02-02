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
	protected function __construct() {
		$this->setup_hooks();
	}

	/**
	 * To setup action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {
		register_activation_hook( SMFCS_PLUGIN_FILE, array( $this, 'plugin_activation' ) );
		register_deactivation_hook( SMFCS_PLUGIN_FILE, array( $this, 'plugin_deactivation' ) );

		add_action( 'plugins_loaded', array( $this, 'load_plugin_text_domain' ) );
		add_action( 'admin_init', array( $this, 'check_php_version' ) );
		add_action( 'init', array( $this, 'register_blocks' ) );
		// add_action( 'enqueue_block_assets', array( $this, 'enqueue_shared_assets' ) );
		// add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		// add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
		// add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
	}

	/**
	 * Create blocks.
	 */
	public function register_blocks() {
		// Register blocks in correct hierarchical order
		$blocks = array(
			'flashcard-front',
			'flashcard-back',
			'flashcard',        // Individual card
			'flashcard-set',    // Card container (should come last)
		);

		foreach ($blocks as $block) {
			$block_path = SMFCS_PLUGIN_PATH . "/src/blocks/{$block}/block.json";
			
			if (!file_exists($block_path)) {
				error_log("Smart Flashcards: Missing block.json for {$block}");
				continue;
			}

			$result = register_block_type($block_path);
			
			if (!$result) {
				error_log("Smart Flashcards: Failed to register block {$block}");
			}
		}
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
	 * Enqueue frontend scripts
	 */
	public function enqueue_frontend_scripts() {
		wp_enqueue_script(
			'smfcs-frontend',
			SMFCS_PLUGIN_URL . 'build/blocks/index.js',
			array(),
			SMFCS_PLUGIN_VERSION,
			true
		);

		wp_enqueue_style(
			'smfcs-frontend',
			SMFCS_PLUGIN_URL . 'build/style.css',
			array(),
			SMFCS_PLUGIN_VERSION
		);
	}

	public function enqueue_shared_assets() {
		wp_enqueue_style(
			'smfcs-frontend-style',
			SMFCS_PLUGIN_BUILD_URI . '/style.css',
			array(),
			filemtime( SMFCS_PLUGIN_BUILD_DIR . '/style.css' )
		);
	}

	public function enqueue_editor_assets() {
		$editor_script_path = 'flashcard/index.js';
		$asset_file         = SMFCS_PLUGIN_BUILD_DIR . '/flashcard/index.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = include $asset_file;

		wp_enqueue_script(
			'smfcs-flashcard-editor',
			SMFCS_PLUGIN_BUILD_URI . '/' . $editor_script_path,
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_style(
			'smfcs-editor-style',
			SMFCS_PLUGIN_BUILD_URI . '/editor.css',
			array(),
			filemtime( SMFCS_PLUGIN_BUILD_DIR . '/editor.css' )
		);
	}

	public function enqueue_frontend_assets() {
		// Frontend script
		wp_enqueue_script(
			'smfcs-frontend',
			SMFCS_PLUGIN_BUILD_URI . '/frontend.js',
			array( 'wp-element', 'wp-components' ),
			$this->get_asset_version( 'frontend.js' ),
			true
		);
	}

	private function get_asset_version( $file ) {
		return filemtime( SMFCS_PLUGIN_BUILD_DIR . '/' . $file );
	}
}
