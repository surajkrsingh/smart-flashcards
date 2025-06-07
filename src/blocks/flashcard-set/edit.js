import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Button, ButtonGroup, PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';
import { FLASHCARD_SET_ALLOWED_BLOCKS, FLASHCARD_SET_DEFAULT_TEMPLATE } from '../../utils/constants';
import { trash, plus } from '@wordpress/icons';
import { InspectorControls } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes, clientId }) {
    const { currentSlide = 0, displayMode, enableShuffle } = attributes;
    const [isInitialized, setIsInitialized] = useState(false);
    const blockProps = useBlockProps();
    const wrapperRef = useRef(null);

    const { innerBlocks, selectedBlockClientId } = useSelect(select => ({
        innerBlocks: select('core/block-editor').getBlocks(clientId),
        selectedBlockClientId: select('core/block-editor').getSelectedBlockClientId()
    }), [clientId]);

    const { removeBlock, insertBlock, selectBlock } = useDispatch('core/block-editor');
    const totalSlides = innerBlocks?.length || 0;

    useEffect(() => {
        if (!isInitialized) {
            if (totalSlides === 0) {
                handleAddSlide();
            }
            setIsInitialized(true);
        }
    }, [isInitialized]);

    useEffect(() => {
        const updateCardVisibility = () => {
            if (!wrapperRef.current) return;

            const cards = wrapperRef.current.querySelectorAll('.wp-block-smfcs-flashcard');
            cards.forEach((card, index) => {
                const cardElement = card.querySelector('[data-type="smfcs/flashcard"]') || card;
                
                if (index === currentSlide) {
                    card.classList.add('is-active');
                    cardElement.style.setProperty('display', 'block', 'important');
                    cardElement.style.setProperty('opacity', '1', 'important');
                    cardElement.style.setProperty('visibility', 'visible', 'important');
                } else {
                    card.classList.remove('is-active');
                    cardElement.style.setProperty('display', 'none', 'important');
                    cardElement.style.setProperty('opacity', '0', 'important');
                    cardElement.style.setProperty('visibility', 'hidden', 'important');
                }
            });
        };

        updateCardVisibility();
        const timeoutId = setTimeout(updateCardVisibility, 100);

        return () => clearTimeout(timeoutId);
    }, [currentSlide, innerBlocks, isInitialized]);

    useEffect(() => {
        if (selectedBlockClientId && innerBlocks.length > 0) {
            const selectedBlockIndex = innerBlocks.findIndex(block => 
                block.clientId === selectedBlockClientId || 
                block.innerBlocks?.some(innerBlock => innerBlock.clientId === selectedBlockClientId)
            );
            
            if (selectedBlockIndex !== -1 && selectedBlockIndex !== currentSlide) {
                setAttributes({ currentSlide: selectedBlockIndex });
            }
        }
    }, [selectedBlockClientId, innerBlocks, currentSlide]);

    const handleAddSlide = () => {
        const newBlock = wp.blocks.createBlock('smfcs/flashcard', {
            index: totalSlides + 1
        });

        insertBlock(newBlock, totalSlides, clientId).then(() => {
            selectBlock(newBlock.clientId);
            setAttributes({ currentSlide: totalSlides });
        });
    };

    const handleRemoveSlide = () => {
        if (totalSlides > 1) {
            const currentBlock = innerBlocks[currentSlide];
            if (currentBlock) {
                removeBlock(currentBlock.clientId);
                const newCurrentSlide = Math.min(currentSlide, totalSlides - 2);
                setAttributes({ currentSlide: newCurrentSlide });
            }
        }
    };

    const selectSlide = (index) => {
        if (index >= 0 && index < totalSlides) {
            setAttributes({ currentSlide: index });
            const targetBlock = innerBlocks[index];
            if (targetBlock) {
                selectBlock(targetBlock.clientId);
            }
        }
    };

    return (
        <div {...blockProps} ref={wrapperRef}>
            <InspectorControls>
                <PanelBody title={__('Flashcard Set Settings', 'smart-flashcards')}>
                    <SelectControl
                        label={__('Display Mode', 'smart-flashcards')}
                        value={displayMode}
                        options={[
                            { label: __('Slide', 'smart-flashcards'), value: 'slide' },
                            { label: __('Stack', 'smart-flashcards'), value: 'stack' },
                            { label: __('Grid', 'smart-flashcards'), value: 'grid' }
                        ]}
                        onChange={(value) => setAttributes({ displayMode: value })}
                    />
                    <ToggleControl
                        label={__('Enable Shuffle', 'smart-flashcards')}
                        checked={enableShuffle}
                        onChange={(value) => setAttributes({ enableShuffle: value })}
                    />
                </PanelBody>
            </InspectorControls>
            
            <div className="flashcard-set-nav">
                <ButtonGroup>
                    <Button
                        icon={trash}
                        variant="secondary"
                        onClick={handleRemoveSlide}
                        disabled={totalSlides <= 1}
                        className="remove-slide-button"
                        isDestructive
                        title={__('Remove current flashcard', 'smart-flashcards')}
                    />
                    <Button
                        variant="secondary"
                        onClick={() => selectSlide(Math.max(0, currentSlide - 1))}
                        disabled={currentSlide === 0}
                        title={__('Previous flashcard', 'smart-flashcards')}
                    >
                        {__('Previous', 'smart-flashcards')}
                    </Button>
                    <Button
                        variant="secondary"
                        className="current-slide-indicator"
                        disabled
                        title={__('Current flashcard position', 'smart-flashcards')}
                    >
                        {currentSlide + 1} / {totalSlides}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => selectSlide(Math.min(totalSlides - 1, currentSlide + 1))}
                        disabled={currentSlide === totalSlides - 1}
                        title={__('Next flashcard', 'smart-flashcards')}
                    >
                        {__('Next', 'smart-flashcards')}
                    </Button>
                    <Button
                        icon={plus}
                        variant="primary"
                        onClick={handleAddSlide}
                        className="add-slide-button"
                        title={__('Add new flashcard', 'smart-flashcards')}
                    />
                </ButtonGroup>
            </div>

            <div className="flashcard-set-container">
                <InnerBlocks
                    allowedBlocks={FLASHCARD_SET_ALLOWED_BLOCKS}
                    template={FLASHCARD_SET_DEFAULT_TEMPLATE}
                    templateLock={false}
                />
            </div>
        </div>
    );
}
