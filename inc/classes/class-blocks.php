<?php

/**
 * Add Blocks.
 *
 * Defines the plugin name, version, and registers two gutenberg blocks.
 *
 * @package    Learndash Flashcards
 * @subpackage Learndash Flashcards/blocks
 * @author     Codeable <hello@sproutient.com>
 */
class Blocks {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Variables for blocks.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      array   $blockvariables   Array of variables to be output to blocks via localization.
	 */	
	private $publicvariables;
	private $blockvariables;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->publicvariables = array();
		$this->blockvariables = array();

	}

	/**
	 * Register the JavaScript/CSS for the block controls in editor.
	 *
	 * @since    1.0.0
	 */
	public function admin_block_assets() {
		
		$this->blockvariables['cards'] = array();
		$this->blockvariables['cards'][0] = array( 'value' => 'select', 'label' => esc_html__( 'Select', 'learndash-flashcards' ) );
		$this->blockvariables['sets'] = array();
		$this->blockvariables['sets'][0] = array( 'value' => 'select', 'label' => esc_html__( 'Select', 'learndash-flashcards' ) );

		$post_args = [
			'post_type'   => 'ld-flashcards',
			'fields'      => 'ids',
			'numberposts' => -1,
			'orderby'     => 'title',
			'order'       => 'ASC',
		];

		/**
		 * Filter the flashcard posts dropdown arguments.
		 *
		 * @since 1.0.1
		 * @param array  $post_args List of get post arguments.
		 */
		$post_args = apply_filters( 'ld-flashcard-post-dropdown-args', $post_args );
		$cards     = get_posts( $post_args );

		foreach( $cards as $card ){
			
			$tempArray = array();			
			$tempArray['value'] = esc_html($card);
			$tempArray['label'] = esc_html(get_the_title($card));
			
			$this->blockvariables['cards'][] = $tempArray;
			
		}	

		$term_args = [
			'taxonomy'   => 'ld-fc-set',
			'hide_empty' => true,
			'orderby'    => 'name',
			'order'      => 'ASC',
		];

		/**
		 * Filter the flashcard terms dropdown arguments.
		 *
		 * @since 1.0.1
		 * @param array  $term_args List of term arguments.
		 */
		$term_args = apply_filters( 'ld-flashcard-term-dropdown-args', $term_args );
		$terms     = get_terms( $term_args );

		foreach( $terms as $term ){
			
			$tempArray    = array();
			$no_of_cards  = array();

			$tempArray['value'] = esc_html($term->term_id);
			$tempArray['label'] = esc_html($term->name);

			$cards = get_posts(
				array(
					'post_type'    => 'ld-flashcards',
					'numberposts'  => '-1',
					'tax_query' => array(
						array(
							'taxonomy' => 'ld-fc-set',
							'field'    => 'id',
							'terms'    => $term->term_id,
						),
					)
				)
			);

			$this->blockvariables['sets'][] = $tempArray;
			$this->blockvariables['maxCards'][$term->term_id] = count( $cards );

		}		

		wp_register_script(
			$this->plugin_name . '-editor',
			esc_url( LEARNDASH_FLASHCARDS_URL . '/admin/dist/js/flashcard-blocks.js') ,
			array( 'jquery', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components' ),
			$this->version, true
		);

		wp_localize_script(
			$this->plugin_name . '-editor',
			'ldflashBlockVariables',
			$this->blockvariables
		);

		wp_enqueue_script( $this->plugin_name . '-editor' );

	}
	
	/**
	 * Register the JavaScript/CSS for the blocks.
	 *
	 * @since    1.0.0
	 */
	public function block_assets() {

		$this->publicvariables = array();
		$this->publicvariables['text'] = array();
		$this->publicvariables['api'] = array();

		$this->publicvariables['nonce'] = esc_html(wp_create_nonce( 'learndash-flashcards' ));
		$this->publicvariables['wpRestNonce'] = esc_html(wp_create_nonce( 'wp_rest' ));

		$this->publicvariables['isFrontEnd'] = 'yes';
		if( is_admin() ){
			$this->publicvariables['isFrontEnd'] = 'no';
		} 

		wp_enqueue_style( $this->plugin_name . '-blocks-css', esc_url(LEARNDASH_FLASHCARDS_URL) . '/public/css/learndash-flashcards-blocks.css', array(), $this->version, 'all' );
		
		wp_enqueue_script( 'ld-owl', esc_url(LEARNDASH_FLASHCARDS_URL) . '/public/js/owl.carousel.js', array( 'jquery' ), $this->version, true );
		
		wp_register_script( $this->plugin_name . '-blocks', esc_url(LEARNDASH_FLASHCARDS_URL) . '/public/js/learndash-flashcards-blocks.js', array( 'jquery', 'wp-blocks', 'wp-polyfill' ), $this->version, true );
		wp_localize_script( $this->plugin_name . '-blocks', 'ldFlashcardsPublicVariables', $this->publicvariables );
		wp_enqueue_script( $this->plugin_name . '-blocks' );

	}	

	/**
	 * Register blocks.
	 *
	 * @since    1.0.0
	 */	
	public function register_learndash_flashcards_blocks() {
		
		register_block_type(
			'learndash-flashcards/card',
			array(

				'attributes'  => array(
					'id'  => array(
						'type' => 'string',
						'default' => '',
					),															
				),				
				'render_callback' => array( $this, 'learndash_flashcards_card'),
				
			)
		);	

		register_block_type(
			'learndash-flashcards/card-set',
			array(

				'attributes'  => array(
					'id'  => array(
						'type' => 'string',
						'default' => '',
					),
					'noOfCards' => array(
						'type'    => 'number',
						'default' => 5
					)
				),
				'render_callback' => array( $this, 'learndash_flashcards_card_set'),
				
			)
		);		
		
	}

	/**
	 * Render form to collect feedback.
	 *
	 * @since    1.0.0
	 */		
	public function learndash_flashcards_card( $args ) {

		if ( empty( $args['id'] ) || 'select' == $args['id'] ) {
			return esc_html__( 'Please select a flashcard', 'learndash-flashcards' );
		}

		return $this->card_display( sanitize_text_field( $args['id'] ) );
	}

	/**
	 * Render form to collect feedback.
	 *
	 * @since    1.0.0
	 */		
	public function learndash_flashcards_card_set( $args ) {

		if ( empty( $args['id'] ) || 'select' == $args['id'] ) {
			return esc_html__( 'Please select a flashcard set', 'learndash-flashcards' );
		}

		$args     = array_map( 'sanitize_text_field',  $args );
		$category = get_term_by( 'id', $args['id'], 'ld-fc-set' );

		return $this->set_display( array(
			'name'       => $category->name,
			'no_of_card' => ( ! empty( $args['noOfCards'] ) ? $args['noOfCards'] : 5 )
		) );
	}

	/**
	 * Create block category for the two blocks this plugin creates.
	 *
	 * @since    1.0.0
	 */		
	public function skeleton_block_categories( $categories, $post ) {

		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'learndash-flashcards',
					'title' => esc_html__( 'Learndash Flashcards', 'learndash-flashcards' ),
				),
			)
		);
	}	

}
