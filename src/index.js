import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	category: 'design',
	attributes: {
		frontContent: {
			type: 'string',
			source: 'html',
			selector: '.flashcard-front .flashcard-content',
			default: ''
		},
		backContent: {
			type: 'string',
			source: 'html',
			selector: '.flashcard-back .flashcard-content',
			default: ''
		},
		postTypes: {
			default: '',
			type: 'array',
		},
		ids: {
			type: 'array',
			default: '',
		},
		example: {
			attributes: {
				postTypes: ['post', 'page'],
				ids: [1,2],
			},
		},
	},
	edit: Edit,
	save,
} );
