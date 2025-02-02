import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/image',
	'core/buttons',
	'core/media-text'
];

const TEMPLATE = [
	['core/heading', { level: 2, placeholder: __('Add front title...', 'smart-flashcards') }],
	['core/paragraph', { placeholder: __('Add front content...', 'smart-flashcards') }]
];

export default function Edit() {
	const blockProps = useBlockProps({
		className: 'flashcard-front'
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