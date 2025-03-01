<?php
/**
 * Single Post Display Block
 *
 * @package smart-flashcards
 */

namespace SMFCS\Features\Inc;

/**
 * Class Single_Post_Display_Block
 */
class Single_Post_Display_Block {

	/**
	 * Instance of this class.
	 *
	 * @var object
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->setup_hooks();
	}

	/**
	 * Get instance of this class.
	 *
	 * @return object
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Setup hooks.
	 *
	 * @return void
	 */
	public function setup_hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_fields' ) );
		add_filter( 'register_post_type_args', array( $this, 'add_rest_support' ), 10, 2 );
	}

	/**
	 * Add REST API support to all post types.
	 *
	 * @param array  $args      Post type registration arguments.
	 * @param string $post_type Post type name.
	 * @return array Modified post type args.
	 */
	public function add_rest_support( $args, $post_type ) {
		if ( ! isset( $args['show_in_rest'] ) || ! $args['show_in_rest'] ) {
			$args['show_in_rest'] = true;
		}

		return $args;
	}

	/**
	 * Register additional REST fields for post types.
	 *
	 * @return void
	 */
	public function register_rest_fields() {
		// Get all public post types.
		$post_types = get_post_types( array( 'public' => true ), 'names' );

		foreach ( $post_types as $post_type ) {
			register_rest_field(
				$post_type,
				'title_rendered',
				array(
					'get_callback' => function ( $post ) {
						return get_the_title( $post['id'] );
					},
					'schema'       => array(
						'description' => __( 'Post title rendered', 'smart-flashcards' ),
						'type'        => 'string',
					),
				)
			);
		}
	}

	/**
	 * Register the block.
	 *
	 * @return void
	 */
	public function register_block() {
		$block_path = SMFCS_PLUGIN_PATH . '/build/blocks/single-post-display/block.json';
		if ( ! file_exists( $block_path ) ) {
			return;
		}

		register_block_type(
			$block_path,
			array(
				'render_callback' => array( $this, 'render_block' ),
			)
		);
	}

	/**
	 * Render the block.
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	public function render_block( $attributes ) {
		// Ensure we have all attributes with defaults.
		$attributes = wp_parse_args(
			$attributes,
			array(
				'postId'           => 0,
				'postType'         => 'post',
				'showTitle'        => true,
				'showContent'      => true,
				'showExcerpt'      => false,
				'showFeaturedImage' => true,
				'showMeta'         => true,
				'showDate'         => true,
				'showAuthor'       => true,
				'imageSize'        => 'large',
				'timestamp'        => 0,
				'showReadMore'     => true,
				'readMoreText'     => __('Read More', 'smart-flashcards'),
				'readMoreAlignment' => 'center',
			)
		);

		if ( empty( $attributes['postId'] ) ) {
			return sprintf(
				'<div class="wp-block-smfcs-single-post-display"><p>%s</p></div>',
				esc_html__( 'Please select a post to display.', 'smart-flashcards' )
			);
		}

		$post_id = absint( $attributes['postId'] );
		$post    = get_post( $post_id );

		if ( ! $post || ! is_object( $post ) ) {
			return sprintf(
				'<div class="wp-block-smfcs-single-post-display"><p>%s</p></div>',
				esc_html__( 'Selected post not found.', 'smart-flashcards' )
			);
		}

		// Store the current global post
		$original_post = isset( $GLOBALS['post'] ) ? $GLOBALS['post'] : null;

		// Set up post data
		$GLOBALS['post'] = $post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		setup_postdata( $post );

		ob_start();
		?>
		<div class="wp-block-smfcs-single-post-display">
			<?php if ( $attributes['showFeaturedImage'] && has_post_thumbnail( $post_id ) ) : ?>
				<div class="post-featured-image">
					<?php echo get_the_post_thumbnail( $post_id, $attributes['imageSize'] ); ?>
				</div>
			<?php endif; ?>

			<?php if ( $attributes['showTitle'] ) : ?>
				<h2 class="post-title">
					<a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>">
						<?php echo esc_html( get_the_title( $post_id ) ); ?>
					</a>
				</h2>
			<?php endif; ?>

			<?php if ( $attributes['showMeta'] ) : ?>
				<div class="post-meta">
					<?php if ( $attributes['showAuthor'] ) : ?>
						<span class="post-author">
							<?php
							$author_id   = $post->post_author;
							$author_name = get_the_author_meta( 'display_name', $author_id );
							$author_url  = get_author_posts_url( $author_id );
							?>
							<?php esc_html_e( 'By ', 'smart-flashcards' ); ?>
							<a href="<?php echo esc_url( $author_url ); ?>">
								<?php echo esc_html( $author_name ); ?>
							</a>
						</span>
					<?php endif; ?>

					<?php if ( $attributes['showDate'] ) : ?>
						<span class="post-date">
							<?php esc_html_e( 'Published on ', 'smart-flashcards' ); ?>
							<?php echo esc_html( get_the_date( '', $post_id ) ); ?>
						</span>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<?php if ( $attributes['showExcerpt'] ) : ?>
				<div class="post-excerpt">
					<?php echo wp_kses_post( get_the_excerpt( $post_id ) ); ?>
				</div>
			<?php endif; ?>

			<?php if ( $attributes['showContent'] ) : ?>
				<div class="post-content">
					<?php echo apply_filters( 'the_content', $post->post_content ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
			<?php endif; ?>

			<?php if ( $attributes['showReadMore'] ) : ?>
				<div class="post-read-more align-<?php echo esc_attr( $attributes['readMoreAlignment'] ); ?>">
					<a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" class="read-more-button">
						<?php echo esc_html( $attributes['readMoreText'] ); ?>
					</a>
				</div>
			<?php endif; ?>
		</div>
		<?php
		$output = ob_get_clean();

		// Restore the original post
		if ( $original_post ) {
			$GLOBALS['post'] = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
			setup_postdata( $original_post );
		} else {
			wp_reset_postdata();
		}

		return $output;
	}
}