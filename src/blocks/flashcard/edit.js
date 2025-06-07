import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ButtonGroup, RangeControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';
import { FLASHCARD_ALLOWED_BLOCKS, FLASHCARD_TEMPLATE } from '../../utils/constants';
import { flipHorizontal } from '@wordpress/icons';
import { Icon } from '@wordpress/components';

export default function Edit({ attributes, setAttributes, clientId }) {
	const [activeSide, setActiveSide] = useState('front');
	const { width, index } = attributes;
	const blockProps = useBlockProps({
		'data-index': index
	});

	// Get the selected block information and dispatch
	const { selectedBlockClientId, innerBlocks } = useSelect(select => ({
		selectedBlockClientId: select('core/block-editor').getSelectedBlockClientId(),
		innerBlocks: select('core/block-editor').getBlocks(clientId)
	}), [clientId]);

	const { selectBlock } = useDispatch('core/block-editor');

	// Handle side change
	const handleSideChange = (newSide) => {
		setActiveSide(newSide);
		
		// Find the appropriate block to select
		const targetBlock = innerBlocks.find(block => 
			newSide === 'front' 
				? block.name === 'smfcs/flashcard-front'
				: block.name === 'smfcs/flashcard-back'
		);

		// Select the appropriate block if found
		if (targetBlock) {
			selectBlock(targetBlock.clientId);
		}
	};

	// Effect to handle block selection
	useEffect(() => {
		if (selectedBlockClientId) {
			const frontBlock = innerBlocks.find(block => block.name === 'smfcs/flashcard-front');
			const backBlock = innerBlocks.find(block => block.name === 'smfcs/flashcard-back');

			if (frontBlock && selectedBlockClientId === frontBlock.clientId) {
				setActiveSide('front');
			} else if (backBlock && selectedBlockClientId === backBlock.clientId) {
				setActiveSide('back');
			}
		}
	}, [selectedBlockClientId, innerBlocks]);

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Flashcard Settings', 'smart-flashcards')}>
					<ButtonGroup>
						<Button 
							isPrimary={activeSide === 'front'}
							onClick={() => handleSideChange('front')}
							aria-label={__('Show front side', 'smart-flashcards')}
						>
							{__('Front', 'smart-flashcards')}
						</Button>
						<Button 
							isPrimary={activeSide === 'back'}
							onClick={() => handleSideChange('back')}
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
				</PanelBody>
			</InspectorControls>

			<div className="flashcard">
				<div className={`flashcard-inner flashcard-${activeSide}`}>
					<InnerBlocks
						allowedBlocks={FLASHCARD_ALLOWED_BLOCKS}
						template={FLASHCARD_TEMPLATE}
						templateLock="all"
					/>

					<Button 
						className={`smfcs-flashcard-control-button current-side-${activeSide}`}
						icon={<Icon icon={flipHorizontal} />}
						onClick={() => handleSideChange(activeSide === 'front' ? 'back' : 'front')}
						aria-label={activeSide === 'back' ? __('Show front side', 'smart-flashcards') : __('Show back side', 'smart-flashcards')}
						title={activeSide === 'front' ? __('Currently editing: Front Side - Click to edit Back', 'smart-flashcards') : __('Currently editing: Back Side - Click to edit Front', 'smart-flashcards')}
					/>
				</div>
			</div>
		</div>
	);
}
