/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

/**
 * Register the block
 */
registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});
