import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

// Register Back Side Block
registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});
