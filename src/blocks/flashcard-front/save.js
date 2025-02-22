import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function FrontSave({ attributes }) {
	const { borderStyle } = attributes;
	const blockProps = useBlockProps.save({
		className: `flashcard-front border-style-${borderStyle}`
	});

	return (
		<div {...blockProps}>
			<div className="flashcard-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
