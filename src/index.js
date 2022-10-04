import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	category: 'design',
    attributes: {
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
