import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function FrontSave({ attributes }) {
	const { borderStyle, primaryBorderColor, secondaryBorderColor } = attributes;
	const blockProps = useBlockProps.save({
		className: `flashcard-front border-style-${borderStyle}`,
		style: {
			'--primary-border-color': primaryBorderColor,
			'--secondary-border-color': secondaryBorderColor
		}
	});

	return (
		<div {...blockProps}>
			<div className="flashcard-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
