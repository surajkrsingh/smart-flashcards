import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ButtonGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

const ALLOWED_BLOCKS = ['smfcs/flashcard-front', 'smfcs/flashcard-back'];
const TEMPLATE = [
	['smfcs/flashcard-front'],
	['smfcs/flashcard-back']
];

export default function Edit({ attributes, setAttributes }) {
	const [isFlipped, setIsFlipped] = useState(false);
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={__('Flashcard Settings', 'smart-flashcards')}>
					<ButtonGroup>
						<Button 
							isPrimary={!isFlipped}
							onClick={() => setIsFlipped(false)}
							aria-label={__('Show front side', 'smart-flashcards')}
						>
							{__('Front', 'smart-flashcards')}
						</Button>
						<Button 
							isPrimary={isFlipped}
							onClick={() => setIsFlipped(true)}
							aria-label={__('Show back side', 'smart-flashcards')}
						>
							{__('Back', 'smart-flashcards')}
						</Button>
					</ButtonGroup>
				</PanelBody>
			</InspectorControls>

			<div className="flashcard">
				<div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock="all"
					/>
				</div>
			</div>
		</div>
	);
}
