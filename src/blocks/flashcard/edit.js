import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, __experimentalDimensionsControl as DimensionsControl } from '@wordpress/block-editor';
import { PanelBody, Button, ButtonGroup, RangeControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';
import { FLASHCARD_ALLOWED_BLOCKS, FLASHCARD_TEMPLATE } from '../../utils/constants';

export default function Edit({ attributes, setAttributes, clientId }) {
	const [isFlipped, setIsFlipped] = useState(false);
	const { width, height, index } = attributes;
	const blockProps = useBlockProps({
		'data-index': index
	});

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
		<div {...blockProps}>
			{index && <div className="flashcard-index">{index}</div>}
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
				<PanelBody title="Dimensions">
					<RangeControl
						label="Width (%)"
						value={width}
						onChange={(newWidth) => setAttributes({ width: newWidth })}
						min={20}
						max={100}
						step={5}
					/>
					<RangeControl
						label="Height (px)"
						value={height}
						onChange={(newHeight) => setAttributes({ height: newHeight })}
						min={200}
						max={800}
						step={10}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="flashcard">
				<div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
					<InnerBlocks
						allowedBlocks={FLASHCARD_ALLOWED_BLOCKS}
						template={FLASHCARD_TEMPLATE}
						templateLock="all"
					/>

					<Button 
						className="smfcs-flashcard-flip-button is-primary"
						isPrimary={isFlipped}
						onClick={() => setIsFlipped(!isFlipped)}
						aria-label={isFlipped ? __('Show front side', 'smart-flashcards') : __('Show back side', 'smart-flashcards')}
					>
						<span class="dashicons dashicons-image-flip-horizontal"></span>
					</Button>
				</div>
			</div>
		</div>
	);
}
