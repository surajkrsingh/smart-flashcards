import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/image',
	'core/buttons',
	'core/media-text',
	'core/list',
	'core/quote',
	'core/code'
];

const TEMPLATE = [
	['core/heading', { level: 2, placeholder: __('Add back side title...', 'smart-flashcards') }],
	['core/paragraph', { placeholder: __('Add back side content...', 'smart-flashcards') }]
];

export default function Edit() {
	const blockProps = useBlockProps({
		className: 'flashcard-back'
	});

	return (
		<div { ...blockProps }>
			<div className="flashcard-content">
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
					templateLock={false}
				/>
			</div>
		</div>
	);
} 
