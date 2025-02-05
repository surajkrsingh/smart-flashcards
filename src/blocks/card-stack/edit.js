import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ColorPicker
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { animateFlip, animateSlide, animateStack } from '../../utils/animations';
import { CARD_STACK_DEFAULT_TEMPLATE, CARD_STACK_ALLOWED_BLOCKS, CARD_STACK_DEFAULT_SETTINGS, ANIMATION_TYPES, ANIMATION_DIRECTIONS } from '../../utils/constants';

import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
    const {
        currentCard,
        animationType,
        animationDirection,
        stackSpacing,
        backgroundColor,
        textColor,
        borderRadius,
        padding
    } = attributes;

    const stackRef = useRef(null);

    const { innerBlocks, selectedBlockClientId } = useSelect(select => ({
        innerBlocks: select('core/block-editor').getBlocks(clientId),
        selectedBlockClientId: select('core/block-editor').getSelectedBlockClientId()
    }), [clientId]);

    const { updateBlockAttributes } = useDispatch('core/block-editor');
    const totalCards = innerBlocks?.length || 0;

    useEffect(() => {
        innerBlocks.forEach((block, index) => {
            updateBlockAttributes(block.clientId, {
                index: index + 1,
                backgroundColor,
                textColor
            });
        });
    }, [innerBlocks.length, backgroundColor, textColor]);

    const handleCardChange = (newIndex) => {
        const cardElements = stackRef.current.querySelectorAll('.wp-block-smfcs-card');

        switch (animationType) {
            case 'flip':
                animateFlip(cardElements[currentCard], animationDirection);
                break;
            case 'slide':
                animateSlide(cardElements[currentCard], animationDirection);
                break;
            case 'stack':
                animateStack(Array.from(cardElements), stackSpacing);
                break;
        }

        setAttributes({ currentCard: newIndex });
    };

    const blockProps = useBlockProps({
        ref: stackRef,
        style: {
            '--stack-spacing': `${stackSpacing}px`,
            '--border-radius': `${borderRadius}px`,
            '--padding': `${padding}px`
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Stack Settings', 'card-stack')}>
                    <SelectControl
                        label={__('Animation Type', 'card-stack')}
                        value={animationType}
                        options={[
                            { label: 'Flip', value: 'flip' },
                            { label: 'Slide', value: 'slide' },
                            { label: 'Stack', value: 'stack' }
                        ]}
                        onChange={(value) => setAttributes({ animationType: value })}
                    />
                    <SelectControl
                        label={__('Animation Direction', 'card-stack')}
                        value={animationDirection}
                        options={[
                            { label: 'Horizontal', value: 'horizontal' },
                            { label: 'Vertical', value: 'vertical' }
                        ]}
                        onChange={(value) => setAttributes({ animationDirection: value })}
                    />
                    <RangeControl
                        label={__('Stack Spacing', 'card-stack')}
                        value={stackSpacing}
                        onChange={(value) => setAttributes({ stackSpacing: value })}
                        min={0}
                        max={50}
                    />
                    <RangeControl
                        label={__('Border Radius', 'card-stack')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                    <RangeControl
                        label={__('Padding', 'card-stack')}
                        value={padding}
                        onChange={(value) => setAttributes({ padding: value })}
                        min={0}
                        max={50}
                    />
                    <ColorPicker
                        label={__('Background Color', 'card-stack')}
                        color={backgroundColor}
                        onChange={(value) => setAttributes({ backgroundColor: value })}
                    />
                    <ColorPicker
                        label={__('Text Color', 'card-stack')}
                        color={textColor}
                        onChange={(value) => setAttributes({ textColor: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className="card-stack-controls">
                    {innerBlocks.map((_, index) => (
                        <button
                            key={index}
                            className={`card-nav-button ${currentCard === index ? 'active' : ''}`}
                            onClick={() => handleCardChange(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div className="card-stack-container">
                    <InnerBlocks
                        allowedBlocks={CARD_STACK_ALLOWED_BLOCKS}
                        orientation="horizontal"
                        template={CARD_STACK_DEFAULT_TEMPLATE}
                    />
                </div>
            </div>
        </>
    );
}
