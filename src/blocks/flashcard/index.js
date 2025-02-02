import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

// Register Back Side Block
registerBlockType(metadata.name, {
    ...metadata,
    title: __('Smart Flashcard', 'smart-flashcards'),
	description: __('Create interactive flashcards with custom content', 'smart-flashcards'),
    edit: Edit,
    save: Save,
});
