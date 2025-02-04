import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';
import { Button, ButtonGroup } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { trash, plus } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';
import './editor.scss';
import { FLASHCARD_SET_ALLOWED_BLOCKS, FLASHCARD_SET_DEFAULT_TEMPLATE } from '../../utils/constants';

export default function Edit({ attributes, setAttributes, clientId }) {
    const { currentSlide } = attributes;
    const blockProps = useBlockProps();

    const { innerBlocks } = useSelect(select => ({
        innerBlocks: select('core/block-editor').getBlocks(clientId)
    }), [clientId]);

    const { removeBlock, insertBlock, updateBlockAttributes } = useDispatch('core/block-editor');
    const totalSlides = innerBlocks?.length || 0;

    // Update index attributes for all flashcards
    useEffect(() => {
        innerBlocks.forEach((block, index) => {
            updateBlockAttributes(block.clientId, { index: index + 1 });
        });
    }, [innerBlocks.length]);

    useEffect(() => {
        if (currentSlide >= totalSlides) {
            setAttributes({ currentSlide: Math.max(0, totalSlides - 1) });
        }
    }, [totalSlides]);

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
        <div {...blockProps}>
            <div className="flashcard-set-editor">
                {/* Slide Controls */}
                <div className="flashcard-set-controls">
                    <div className="slide-selector">
                        <div className="slide-selector-label">
                            {__('Flashcards:', 'smart-flashcards')}
                        </div>
                        <ButtonGroup className="slide-buttons">
                            {innerBlocks.map((_, index) => (
                                <Button
                                    key={index}
                                    variant={currentSlide === index ? 'primary' : 'secondary'}
                                    onClick={() => selectSlide(index)}
                                    className="slide-button"
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button
                                icon={plus}
                                variant="secondary"
                                onClick={handleAddSlide}
                                className="add-slide-button"
                            />
                        </ButtonGroup>
                        {totalSlides > 1 && (
                            <Button
                                icon={trash}
                                variant="secondary"
                                onClick={handleRemoveSlide}
                                className="remove-slide-button"
                                isDestructive
                            />
                        )}
                    </div>
                </div>

                {/* Current Slide Editor */}
                <div className="flashcard-editor">
                    <div className="flashcard-slides">
                        <InnerBlocks
                            allowedBlocks={FLASHCARD_SET_ALLOWED_BLOCKS}
                            template={FLASHCARD_SET_DEFAULT_TEMPLATE}
                            orientation="horizontal"
                            renderAppender={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
