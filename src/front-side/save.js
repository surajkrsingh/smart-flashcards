import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function FrontSave() {
	const blockProps = useBlockProps.save({
		className: 'flashcard-front'
	});

	return (
		<div { ...blockProps }>
			<div className="flashcard-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
