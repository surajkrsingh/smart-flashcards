<?php
/**
 * Member Block
 *
 * @package smart-flashcards
 */

namespace SMFCS\Features\Inc;

/**
 * Class Member_Block
 */
class Member_Block {

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
	}

	/**
	 * Register additional REST fields for users.
	 *
	 * @return void
	 */
	public function register_rest_fields() {
		register_rest_field(
			'user',
			'display_name_rendered',
			array(
				'get_callback' => function ( $user ) {
					return get_the_author_meta( 'display_name', $user['id'] );
				},
				'schema'       => array(
					'description' => __( 'Member display name rendered', 'smart-flashcards' ),
					'type'        => 'string',
				),
			)
		);
	}

	/**
	 * Register the block.
	 *
	 * @return void
	 */
	public function register_block() {
		$block_path = SMFCS_PLUGIN_PATH . '/build/blocks/member/block.json';
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
				'userId'          => 0,
				'showName'        => true,
				'showAvatar'      => true,
				'showBio'         => true,
				'showEmail'       => false,
				'showWebsite'     => false,
				'showSocialLinks' => false,
				'avatarSize'      => 96,
				'timestamp'       => 0,
			)
		);

		if ( empty( $attributes['userId'] ) ) {
			return sprintf(
				'<div class="wp-block-smfcs-member"><p>%s</p></div>',
				esc_html__( 'Please select a member to display.', 'smart-flashcards' )
			);
		}

		$user_id = absint( $attributes['userId'] );
		$user    = get_userdata( $user_id );

		if ( ! $user ) {
			return sprintf(
				'<div class="wp-block-smfcs-member"><p>%s</p></div>',
				esc_html__( 'Selected member not found.', 'smart-flashcards' )
			);
		}

		ob_start();
		?>
		<div class="wp-block-smfcs-member">
			<?php if ( $attributes['showAvatar'] ) : ?>
				<div class="user-avatar">
					<?php echo get_avatar( $user_id, $attributes['avatarSize'] ); ?>
				</div>
			<?php endif; ?>

			<?php if ( $attributes['showName'] ) : ?>
				<h2 class="user-name">
					<?php echo esc_html( $user->display_name ); ?>
				</h2>
			<?php endif; ?>

			<?php if ( $attributes['showEmail'] && $user->user_email ) : ?>
				<div class="user-email">
					<a href="mailto:<?php echo esc_attr( $user->user_email ); ?>">
						<?php echo esc_html( $user->user_email ); ?>
					</a>
				</div>
			<?php endif; ?>

			<?php if ( $attributes['showWebsite'] && $user->user_url ) : ?>
				<div class="user-website">
					<a href="<?php echo esc_url( $user->user_url ); ?>" target="_blank" rel="noopener noreferrer">
						<?php echo esc_html__( 'Website', 'smart-flashcards' ); ?>
					</a>
				</div>
			<?php endif; ?>

			<?php if ( $attributes['showBio'] && $user->description ) : ?>
				<div class="user-bio">
					<?php echo wp_kses_post( $user->description ); ?>
				</div>
			<?php endif; ?>

			<?php if ( $attributes['showSocialLinks'] ) : ?>
				<div class="user-social-links">
					<?php
					$social_links = array(
						'facebook'  => get_the_author_meta( 'facebook', $user_id ),
						'twitter'   => get_the_author_meta( 'twitter', $user_id ),
						'linkedin'  => get_the_author_meta( 'linkedin', $user_id ),
						'instagram' => get_the_author_meta( 'instagram', $user_id ),
					);

					foreach ( $social_links as $network => $url ) {
						if ( ! empty( $url ) ) {
							printf(
								'<a href="%s" class="social-link %s" target="_blank" rel="noopener noreferrer">%s</a>',
								esc_url( $url ),
								esc_attr( $network ),
								esc_html( ucfirst( $network ) )
							);
						}
					}
					?>
				</div>
			<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}
}
