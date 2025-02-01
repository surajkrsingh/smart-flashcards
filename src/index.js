import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';
import { InnerBlocks } from '@wordpress/block-editor';

// Main Flashcard Block
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

// Front Side Block
import frontMetadata from './front-side/block.json';
import FrontEdit from './front-side/edit';

// Back Side Block
import backMetadata from './back-side/block.json';
import BackEdit from './back-side/edit';

// Register Main Block
registerBlockType(metadata.name, {
	...metadata,
	title: __('Smart Flashcards', 'smart-flashcards'),
	description: __('Create interactive flashcards with custom content', 'smart-flashcards'),
	edit: Edit,
	save: Save,
});

// Register Front Side Block
registerBlockType(frontMetadata.name, {
	...frontMetadata,
	edit: FrontEdit,
	save: () => <InnerBlocks.Content />,
});

// Register Back Side Block
registerBlockType(backMetadata.name, {
	...backMetadata,
	edit: BackEdit,
	save: () => <InnerBlocks.Content />,
});
