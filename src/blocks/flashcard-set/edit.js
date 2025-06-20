import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Button, ButtonGroup, PanelBody, ToggleControl, SelectControl, ColorPicker } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';
import { FLASHCARD_SET_ALLOWED_BLOCKS, FLASHCARD_SET_DEFAULT_TEMPLATE } from '../../utils/constants';
import { trash, plus, arrowLeft, arrowRight } from '@wordpress/icons';
import { InspectorControls } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes, clientId }) {
    const { currentSlide = 0, displayMode, enableShuffle, showNavigation = true, buttonBackgroundColor = '', buttonTextColor = '' } = attributes;
    const [isInitialized, setIsInitialized] = useState(false);
    const blockProps = useBlockProps();
    const wrapperRef = useRef(null);

    const { innerBlocks, selectedBlockClientId, isBlockSelected } = useSelect(select => ({
        innerBlocks: select('core/block-editor').getBlocks(clientId),
        selectedBlockClientId: select('core/block-editor').getSelectedBlockClientId(),
        isBlockSelected: select('core/block-editor').isBlockSelected(clientId)
    }), [clientId]);

    const { removeBlock, insertBlock, selectBlock } = useDispatch('core/block-editor');
    const totalSlides = innerBlocks?.length || 0;

    // Handle click on flashcard-set header to select the set
    const handleHeaderClick = (event) => {
        const target = event.target;
        const isButton = target.closest('button');

        // Only select flashcard-set if clicking on header area, not on buttons
        if (!isButton) {
            event.stopPropagation();
            selectBlock(clientId);
        }
    };

    // Handle click on container to select flashcard-set when clicking on empty areas
    const handleContainerClick = (event) => {
        const target = event.target;

        // Check if we're clicking on the main container or padding areas
        const isMainContainer = target.classList.contains('wp-block-smfcs-flashcard-set');
        const isFlashcardSetContainer = target.classList.contains('flashcard-set-container');
        const isHeader = target.closest('.flashcard-set-header');
        const isButton = target.closest('button');

        // Check if clicking on an inner block or its content
        const isInnerBlock = target.closest('.wp-block-smfcs-flashcard');
        const isInnerBlockContent = target.closest('.flashcard-content');
        const isBlockEditorContent = target.closest('.block-editor-block-list__block');

        // Select flashcard-set if clicking on container/padding areas, but NOT on inner blocks
        if ((isMainContainer || isFlashcardSetContainer || isHeader) &&
            !isInnerBlock &&
            !isInnerBlockContent &&
            !isBlockEditorContent &&
            !isButton) {
            event.stopPropagation();
            selectBlock(clientId);
        }
    };

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
        <div {...blockProps} ref={wrapperRef} onClick={handleContainerClick}>
            <InspectorControls>
                <PanelBody title={__('Flashcard Set Settings', 'smart-flashcards')} initialOpen={true}>
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

                <PanelBody title={__('Navigation & Styling', 'smart-flashcards')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Navigation', 'smart-flashcards')}
                        help={__('Show/hide navigation buttons on frontend', 'smart-flashcards')}
                        checked={showNavigation}
                        onChange={(value) => setAttributes({ showNavigation: value })}
                    />

                    {showNavigation && (
                        <>
                            <div className="color-control-group">
                                <label className="color-control-label">
                                    {__('Button Background Color', 'smart-flashcards')}
                                </label>
                                <ColorPicker
                                    color={buttonBackgroundColor}
                                    onChangeComplete={(value) => setAttributes({ buttonBackgroundColor: value.hex })}
                                    disableAlpha={false}
                                />
                                {buttonBackgroundColor && (
                                    <Button
                                        isSmall
                                        variant="secondary"
                                        onClick={() => setAttributes({ buttonBackgroundColor: '' })}
                                        style={{ marginTop: '8px' }}
                                    >
                                        {__('Reset', 'smart-flashcards')}
                                    </Button>
                                )}
                            </div>

                            <div className="color-control-group" style={{ marginTop: '20px' }}>
                                <label className="color-control-label">
                                    {__('Button Text Color', 'smart-flashcards')}
                                </label>
                                <ColorPicker
                                    color={buttonTextColor}
                                    onChangeComplete={(value) => setAttributes({ buttonTextColor: value.hex })}
                                    disableAlpha={false}
                                />
                                {buttonTextColor && (
                                    <Button
                                        isSmall
                                        variant="secondary"
                                        onClick={() => setAttributes({ buttonTextColor: '' })}
                                        style={{ marginTop: '8px' }}
                                    >
                                        {__('Reset', 'smart-flashcards')}
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Flashcard Navigation', 'smart-flashcards')} initialOpen={true}>
                    <div className="flashcard-nav-sidebar">
                        <div className="current-flashcard-info">
                            <strong>{__('Current Flashcard:', 'smart-flashcards')}</strong> {currentSlide + 1} / {totalSlides}
                        </div>

                        <div className="navigation-controls">
                            <div className="nav-buttons-row">
                                <Button
                                    icon={arrowLeft}
                                    variant="secondary"
                                    onClick={() => selectSlide(Math.max(0, currentSlide - 1))}
                                    disabled={currentSlide === 0}
                                    title={__('Previous flashcard', 'smart-flashcards')}
                                    className="nav-button"
                                >
                                    {__('Previous', 'smart-flashcards')}
                                </Button>
                                <Button
                                    icon={arrowRight}
                                    variant="secondary"
                                    onClick={() => selectSlide(Math.min(totalSlides - 1, currentSlide + 1))}
                                    disabled={currentSlide === totalSlides - 1}
                                    title={__('Next flashcard', 'smart-flashcards')}
                                    className="nav-button"
                                >
                                    {__('Next', 'smart-flashcards')}
                                </Button>
                            </div>

                            <div className="action-buttons-row">
                                <Button
                                    icon={plus}
                                    variant="primary"
                                    onClick={handleAddSlide}
                                    title={__('Add new flashcard', 'smart-flashcards')}
                                    className="add-button"
                                >
                                    {__('Add Flashcard', 'smart-flashcards')}
                                </Button>
                                <Button
                                    icon={trash}
                                    variant="secondary"
                                    onClick={handleRemoveSlide}
                                    disabled={totalSlides <= 1}
                                    isDestructive
                                    title={__('Remove current flashcard', 'smart-flashcards')}
                                    className="remove-button"
                                >
                                    {__('Remove', 'smart-flashcards')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </PanelBody>
            </InspectorControls>

            <div className="flashcard-set-header" onClick={handleHeaderClick}>
                <div className="flashcard-set-title">
                    <strong>{__('Flashcard Set', 'smart-flashcards')}</strong>
                    <span className="mode-indicator">({displayMode} mode)</span>
                </div>
                <div className="flashcard-navigation-header">
                    <Button
                        icon={arrowLeft}
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            selectSlide(Math.max(0, currentSlide - 1));
                        }}
                        disabled={currentSlide === 0}
                        title={__('Previous flashcard', 'smart-flashcards')}
                        className="nav-button-header nav-previous"
                        size="small"
                    >
                        {__('Previous', 'smart-flashcards')}
                    </Button>

                    <Button
                        icon={plus}
                        variant="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddSlide();
                        }}
                        title={__('Add new flashcard', 'smart-flashcards')}
                        className="nav-button-header add-button-header"
                        size="small"
                    />

                    <div className="flashcard-position-indicator">
                        <span className="current-position">{currentSlide + 1}</span>
                        <span className="position-separator">/</span>
                        <span className="total-count">{totalSlides}</span>
                    </div>

                    <Button
                        icon={trash}
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSlide();
                        }}
                        disabled={totalSlides <= 1}
                        isDestructive
                        title={__('Remove current flashcard', 'smart-flashcards')}
                        className="nav-button-header remove-button-header"
                        size="small"
                    />

                    <Button
                        icon={arrowRight}
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            selectSlide(Math.min(totalSlides - 1, currentSlide + 1));
                        }}
                        disabled={currentSlide === totalSlides - 1}
                        title={__('Next flashcard', 'smart-flashcards')}
                        className="nav-button-header nav-next"
                        size="small"
                    >
                        {__('Next', 'smart-flashcards')}
                    </Button>
                </div>
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
