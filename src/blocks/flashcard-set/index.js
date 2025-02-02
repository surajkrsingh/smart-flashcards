import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';
import { __ } from '@wordpress/i18n';

registerBlockType(metadata.name, {
    ...metadata,
    icon: 'slides',
    title: __('Flashcard Set', 'smart-flashcards'),
    description: __('Create a set of flashcards with carousel navigation', 'smart-flashcards'), 
    edit: Edit,
    save: Save,
});
