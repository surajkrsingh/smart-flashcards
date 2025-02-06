import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

const settings = {
    icon: 'slides',
    edit: Edit,
    save: Save,
};

registerBlockType(metadata.name, { ...metadata, ...settings }); 
