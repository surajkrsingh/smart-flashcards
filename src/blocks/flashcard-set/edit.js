import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Button, ButtonGroup } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';
import { FLASHCARD_SET_ALLOWED_BLOCKS, FLASHCARD_SET_DEFAULT_TEMPLATE } from '../../utils/constants';
import { trash, plus } from '@wordpress/icons';

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

    useEffect(() => {
        if (!isInitialized) {
            if (totalSlides === 0) {
                handleAddSlide();
            }
            setIsInitialized(true);
        }
    }, [isInitialized]);

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
    };

    const handleRemoveSlide = () => {
        if (totalSlides > 1) {
            const currentBlock = innerBlocks[currentSlide];
            if (currentBlock) {
                removeBlock(currentBlock.clientId);
                selectSlide(Math.min(currentSlide, totalSlides - 2));
            }
        }
    };

    const selectSlide = (index) => {
        setAttributes({ currentSlide: index });
    };

    return (
        <div {...blockProps} ref={wrapperRef}>
            <div className="flashcard-set-nav">
                <ButtonGroup>
                    <Button
                        icon={trash}
                        variant="secondary"
                        onClick={handleRemoveSlide}
                        disabled={totalSlides <= 1}
                        className="remove-slide-button"
                        isDestructive
                    />
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
                        icon={plus}
                        variant="primary"
                        onClick={handleAddSlide}
                        className="add-slide-button"
                    />
                </ButtonGroup>
            </div>

            <InnerBlocks
                allowedBlocks={FLASHCARD_SET_ALLOWED_BLOCKS}
                template={FLASHCARD_SET_DEFAULT_TEMPLATE}
                templateLock={false}
            />
        </div>
    );
}
