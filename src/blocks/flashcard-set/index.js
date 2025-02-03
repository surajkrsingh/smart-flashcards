import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

registerBlockType(metadata.name, {
    ...metadata,
    title: __('Flashcard Set', 'smart-flashcards'),
    description: __('Create a set of flashcards with carousel navigation', 'smart-flashcards'),
    edit: Edit,
    save: Save,
});
