import { registerBlockType } from '@wordpress/blocks';
import backMetadata from './block.json';
import BackEdit from './edit';
import BackSave from './save';

// Register Back Side Block
registerBlockType(backMetadata.name, {
	...backMetadata,
	edit: BackEdit,
	save: BackSave,
});
