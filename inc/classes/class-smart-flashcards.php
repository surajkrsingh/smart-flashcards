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
		// Load plugin classes.
		// Admin_Settings::get_instance();

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

		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action('rest_api_init', array($this, 'register_rest_routes'));
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
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
	 * Register the flashcards block.
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type( SMFCS_PLUGIN_BUILD_DIR, array(
			'render_callback' => array( $this, 'render_flashcard_block' ),
		) );
	}

	/**
	 * Register flashcard post type.
	 *
	 * @return void
	 */
	public function register_post_type() {
		register_post_type(
			'flashcard',
			array(
				'labels'       => array(
					'name'          => __( 'Flashcards', 'smart-flashcards' ),
					'singular_name' => __( 'Flashcard', 'smart-flashcards' ),
				),
				'public'       => true,
				'show_in_rest' => true,
				'supports'     => array( 'title', 'editor' ),
				'menu_icon'    => 'dashicons-index-card',
			)
		);

		register_taxonomy(
			'flashcard_set',
			'flashcard',
			array(
				'labels'       => array(
					'name'          => __( 'Flashcard Sets', 'smart-flashcards' ),
					'singular_name' => __( 'Flashcard Set', 'smart-flashcards' ),
				),
				'public'       => true,
				'show_in_rest' => true,
				'hierarchical' => true,
			)
		);
	}

	/**
	 * Register REST API routes
	 */
	public function register_rest_routes() {
		register_rest_route('smart-flashcards/v1', '/sets', array(
			'methods' => 'GET',
			'callback' => array($this, 'get_flashcard_sets'),
			'permission_callback' => '__return_true',
		));
	}

	/**
	 * Get all flashcard sets
	 *
	 * @return array
	 */
	public function get_flashcard_sets() {
		$terms = get_terms(array(
			'taxonomy' => 'flashcard_set',
			'hide_empty' => true,
		));

		return array_map(function($term) {
			return array(
				'label' => $term->name,
				'value' => $term->slug,
			);
		}, $terms);
	}

	/**
	 * Render the flashcard block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @return string Rendered block output.
	 */
	public function render_flashcard_block( $attributes, $content ) {
		return $content;

		// Suppress warnings from loadHTML
		libxml_use_internal_errors( true );
		
		// Get the saved content
		$wrapper = new \DOMDocument();
		$wrapper->loadHTML( mb_convert_encoding( $content, 'HTML-ENTITIES', 'UTF-8' ), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
		
		// Create XPath object to query elements
		$xpath = new \DOMXPath( $wrapper );
		
		// Find the inner div and add interactive attributes
		$inner = $xpath->query( "//*[contains(@class, 'flashcard-inner')]" )->item( 0 );
		if ( $inner ) {
			$inner->setAttribute( 'tabindex', '0' );
			$inner->setAttribute( 'role', 'button' );
			$inner->setAttribute( 'aria-label', __( 'Flashcard - Click or press Enter to flip', 'smart-flashcards' ) );
		}
		
		// Find front and back divs and add aria-hidden
		$front = $xpath->query( "//*[contains(@class, 'flashcard-front')]" )->item( 0 );
		$back = $xpath->query( "//*[contains(@class, 'flashcard-back')]" )->item( 0 );
		if ( $front && $back ) {
			$front->setAttribute( 'aria-hidden', 'false' );
			$back->setAttribute( 'aria-hidden', 'true' );
		}
		
		// Clean up and return the modified HTML
		libxml_clear_errors();
		$output = $wrapper->saveHTML();
		
		// Remove DOCTYPE and <html><body> tags that DOMDocument adds
		$output = preg_replace( '/^<!DOCTYPE.+?>/', '', str_replace( array( '<html>', '</html>', '<body>', '</body>' ), array( '', '', '', '' ), $output ) );
		
		return trim( $output );
	}

	/**
	 * Enqueue frontend scripts
	 */
	public function enqueue_frontend_scripts() {
		wp_enqueue_script(
			'smfcs-frontend',
			SMFCS_PLUGIN_URL . 'build/frontend.js',
			array(),
			SMFCS_PLUGIN_VERSION,
			true
		);
	}
}
