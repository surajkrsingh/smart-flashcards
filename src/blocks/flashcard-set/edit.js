import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    InnerBlocks, 
    InspectorControls 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    Button, 
    ButtonGroup,
    __experimentalNumberControl as NumberControl 
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { trash, plus } from '@wordpress/icons';
import { useEffect, useState, useRef } from '@wordpress/element';

// Define allowed blocks and template.
const ALLOWED_BLOCKS = ['smfcs/flashcard'];
const TEMPLATE = [
    ['smfcs/flashcard', { index: 1 }]
];

export default function Edit({ attributes, setAttributes, clientId }) {
    const { currentSlide = 0 } = attributes;
    const [isInitialized, setIsInitialized] = useState(false);
    const blockProps = useBlockProps();
    const wrapperRef = useRef(null);

    const { innerBlocks } = useSelect(select => ({
        innerBlocks: select('core/block-editor').getBlocks(clientId)
    }), [clientId]);

    const { removeBlock, insertBlock } = useDispatch('core/block-editor');
    const totalSlides = innerBlocks?.length || 0;

    // Initialize component and add first flashcard if needed
    useEffect(() => {
        if (!isInitialized) {
            if (totalSlides === 0) {
                handleAddSlide();
            }
            setIsInitialized(true);
        }
    }, [isInitialized]);

    // Update flashcard visibility
    useEffect(() => {
        if (isInitialized && wrapperRef.current) {
            const cards = wrapperRef.current.querySelectorAll('.wp-block-smfcs-flashcard');
            cards.forEach((card, index) => {
                if (index === currentSlide) {
                    card.classList.add('is-active');
                    card.style.display = 'block';
                } else {
                    card.classList.remove('is-active');
                    card.style.display = 'none';
                }
            });
        }
    }, [currentSlide, innerBlocks, isInitialized]);

    const handleAddSlide = () => {
        const block = wp.blocks.createBlock('smfcs/flashcard', {
            index: totalSlides + 1
        });
        insertBlock(block, totalSlides, clientId);
        setAttributes({ currentSlide: totalSlides });
    };

    const handleRemoveSlide = () => {
        if (totalSlides > 1) {
            const blockToRemove = innerBlocks[currentSlide];
            removeBlock(blockToRemove.clientId);
            setAttributes({ 
                currentSlide: Math.max(0, currentSlide - 1)
            });
        }
    };

    const selectSlide = (index) => {
        setAttributes({ currentSlide: index });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Flashcard Set Controls', 'smart-flashcards')}>
                    <div className="flashcard-set-sidebar-controls">
                        <div className="flashcard-navigation">
                            <NumberControl
                                label={__('Current Flashcard', 'smart-flashcards')}
                                value={currentSlide + 1}
                                onChange={(value) => {
                                    const newValue = Math.min(Math.max(1, value), totalSlides);
                                    selectSlide(newValue - 1);
                                }}
                                min={1}
                                max={totalSlides}
                            />
                            <div className="flashcard-count">
                                {__('Total Flashcards:', 'smart-flashcards')} {totalSlides}
                            </div>
                        </div>
                        
                        {totalSlides > 1 && (
                            <Button
                                variant="secondary"
                                onClick={handleRemoveSlide}
                                icon={trash}
                                className="remove-flashcard-button"
                                isDestructive
                            >
                                {__('Remove Current Flashcard', 'smart-flashcards')}
                            </Button>
                        )}
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps} ref={wrapperRef}>
                <div className="flashcard-set-editor">
                    <div className="flashcard-set-simple-nav">
                        <ButtonGroup>
                            <Button
                                variant="secondary"
                                onClick={() => selectSlide(Math.max(0, currentSlide - 1))}
                                disabled={currentSlide === 0}
                            >
                                {__('Previous', 'smart-flashcards')}
                            </Button>
                            <Button
                                variant="secondary"
                                className="current-slide-indicator"
                                disabled
                            >
                                {currentSlide + 1} / {totalSlides}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => selectSlide(Math.min(totalSlides - 1, currentSlide + 1))}
                                disabled={currentSlide === totalSlides - 1}
                            >
                                {__('Next', 'smart-flashcards')}
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleAddSlide}
                                icon={plus}
                                className="add-flashcard-button"
                            >
                                {__('Add', 'smart-flashcards')}
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div className="flashcard-editor">
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            templateLock={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
