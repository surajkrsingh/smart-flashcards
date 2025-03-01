/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl, 
    ToggleControl,
    Spinner,
    Placeholder,
    Icon,
    Notice
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';
import { post } from '@wordpress/icons';

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