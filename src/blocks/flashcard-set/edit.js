import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Button, Tooltip } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { trash } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';
import './editor.scss';

const ALLOWED_BLOCKS = ['smfcs/flashcard'];
const TEMPLATE = [['smfcs/flashcard']];

export default function Edit({ attributes, setAttributes, clientId }) {
    const { currentSlide } = attributes;
    const blockProps = useBlockProps();

    const { innerBlocks } = useSelect(select => ({
        innerBlocks: select('core/block-editor').getBlocks(clientId)
    }), [clientId]);

    const { removeBlock } = useDispatch('core/block-editor');
    const totalSlides = innerBlocks?.length || 0;

    // Hide all slides except current one
    useEffect(() => {
        const slides = document.querySelectorAll(`#block-${clientId} .wp-block-smfcs-flashcard`);
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }, [currentSlide, totalSlides, clientId]);

    const handlePrev = () => {
        setAttributes({ 
            currentSlide: Math.max(0, currentSlide - 1)
        });
    };

    const handleNext = () => {
        setAttributes({ 
            currentSlide: Math.min(totalSlides - 1, currentSlide + 1)
        });
    };

    const handleRemoveCard = () => {
        if (totalSlides > 1) {
            const blockToRemove = innerBlocks[currentSlide];
            removeBlock(blockToRemove.clientId);
            setAttributes({ 
                currentSlide: Math.max(0, currentSlide - 1)
            });
        }
    };

    return (
        <div {...blockProps} id={`block-${clientId}`}>
            <div className="flashcard-set-wrapper">
                <div className="flashcard-set-controls">
                    <div className="flashcard-controls">
                        <InnerBlocks.ButtonBlockAppender />
                        {totalSlides > 1 && (
                            <Tooltip text={__('Remove current flashcard', 'smart-flashcards')}>
                                <Button
                                    variant="secondary"
                                    icon={trash}
                                    onClick={handleRemoveCard}
                                    className="flashcard-remove-button"
                                />
                            </Tooltip>
                        )}
                    </div>
                    <div className="flashcard-set-nav">
                        <Button 
                            variant="secondary"
                            onClick={handlePrev}
                            disabled={currentSlide === 0}
                            icon="arrow-left-alt2"
                            className="flashcard-nav-button prev"
                        >
                            {__('Previous', 'smart-flashcards')}
                        </Button>
                        <span className="flashcard-set-counter">
                            {__('Card', 'smart-flashcards')} {currentSlide + 1} / {totalSlides}
                        </span>
                        <Button 
                            variant="secondary"
                            onClick={handleNext}
                            disabled={currentSlide === totalSlides - 1}
                            icon="arrow-right-alt2"
                            iconPosition="right"
                            className="flashcard-nav-button next"
                        >
                            {__('Next', 'smart-flashcards')}
                        </Button>
                    </div>
                </div>

                <div className="flashcard-set-slides">
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        orientation="horizontal"
                        renderAppender={false}
                    />
                </div>
            </div>
        </div>
    );
}
