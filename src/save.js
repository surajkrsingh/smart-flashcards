import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div className="flashcard">
				<div className="flashcard-inner"
					role="button"
					tabIndex="0"
					aria-label="Flashcard front side - Click or press Enter to flip">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
