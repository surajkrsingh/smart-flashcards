import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function BackSave({ attributes }) {
	const { borderStyle } = attributes;
	const blockProps = useBlockProps.save({
		className: `flashcard-back border-style-${borderStyle}`
	});

	return (
		<div {...blockProps}>
			<div className="flashcard-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
