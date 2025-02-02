import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ButtonGroup } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

const ALLOWED_BLOCKS = ['smfcs/flashcard-front', 'smfcs/flashcard-back'];
const TEMPLATE = [
	['smfcs/flashcard-front'],
	['smfcs/flashcard-back']
];

export default function Edit({ attributes, setAttributes, clientId }) {
	const [isFlipped, setIsFlipped] = useState(false);
	const blockProps = useBlockProps();

	// Get the selected block information
	const { selectedBlockClientId } = useSelect(select => ({
		selectedBlockClientId: select('core/block-editor').getSelectedBlockClientId(),
	}));

	// Get inner blocks
	const { innerBlocks } = useSelect(select => ({
		innerBlocks: select('core/block-editor').getBlocks(clientId),
	}));

	// Effect to handle block selection
	useEffect(() => {
		if (selectedBlockClientId) {
			// Find if the selected block is one of our inner blocks
			const frontBlock = innerBlocks.find(block => block.name === 'smfcs/flashcard-front');
			const backBlock = innerBlocks.find(block => block.name === 'smfcs/flashcard-back');

			if (frontBlock && selectedBlockClientId === frontBlock.clientId) {
				setIsFlipped(false);
			} else if (backBlock && selectedBlockClientId === backBlock.clientId) {
				setIsFlipped(true);
			}
		}
	}, [selectedBlockClientId, innerBlocks]);

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
