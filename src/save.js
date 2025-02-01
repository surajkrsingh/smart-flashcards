import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { frontContent, backContent } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div className="flashcard">
				<div className="flashcard-inner">
					<div className="flashcard-front">
						<RichText.Content
							tagName="div"
							className="flashcard-content"
							value={frontContent}
						/>
					</div>
					<div className="flashcard-back">
						<RichText.Content
							tagName="div"
							className="flashcard-content"
							value={backContent}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
