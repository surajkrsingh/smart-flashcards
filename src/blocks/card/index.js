import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

const settings = {
    icon: 'card',
    edit: Edit,
    save: Save,
};

registerBlockType(metadata.name, { ...metadata, ...settings }); 
