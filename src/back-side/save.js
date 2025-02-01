import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function BackSave() {
	const blockProps = useBlockProps.save({
		className: 'flashcard-back'
	});

	return (
		<div { ...blockProps }>
			<div className="flashcard-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
