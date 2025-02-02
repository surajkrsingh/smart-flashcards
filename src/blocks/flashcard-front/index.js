import { registerBlockType } from '@wordpress/blocks';
import frontMetadata from './block.json';
import FrontEdit from './edit';
import FrontSave from './save';

// Register Front Side Block
registerBlockType(frontMetadata.name, {
	...frontMetadata,
	edit: FrontEdit,
	save: FrontSave,
});
