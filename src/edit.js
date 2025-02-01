import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ButtonGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const [isFlipped, setIsFlipped] = useState(false);
	const blockProps = useBlockProps();
	const { frontContent, backContent } = attributes;

	console.log(frontContent);
	console.log(backContent);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={__('Flashcard Settings', 'smart-flashcards')}>
					<ButtonGroup>
						<Button 
							isPrimary={!isFlipped}
							onClick={() => setIsFlipped(false)}
						>
							{__('Front', 'smart-flashcards')}
						</Button>
						<Button 
							isPrimary={isFlipped}
							onClick={() => setIsFlipped(true)}
						>
							{__('Back', 'smart-flashcards')}
						</Button>
					</ButtonGroup>
				</PanelBody>
			</InspectorControls>

			<div className="flashcard">
				<div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
					<div className="flashcard-front">
						<RichText
							tagName="div"
							className="flashcard-content"
							value={frontContent}
							onChange={(content) => {
								setAttributes({ frontContent: content });
							}}
							placeholder={__('Add front side content...', 'smart-flashcards')}
							keepPlaceholderOnFocus={true}
						/>
					</div>
					<div className="flashcard-back">
						<RichText
							tagName="div"
							className="flashcard-content"
							value={backContent}
							onChange={(content) => {
								setAttributes({ backContent: content });
							}}
							placeholder={__('Add back side content...', 'smart-flashcards')}
							keepPlaceholderOnFocus={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
