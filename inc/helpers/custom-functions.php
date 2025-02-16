<?php
/**
 * Smart Flashcards
 *
 * @version 1.0.0
 * @package smart-flashcards
 */

// Disable the direct access to this class.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Return the post types.
 *
 * @return array $post_types List of post types.
 */
function smfcs_get_post_types() {

	$post_types = [];

	/**
	 * Filters the post types.
	 *
	 * @param array $post_types List of post types.
	 */
	return apply_filters( 'smfcs_get_post_types', $post_types );
}
