import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { animateFlip, animateSlide, animateStack } from '../../utils/animations';
import { CARD_STACK_DEFAULT_TEMPLATE, CARD_STACK_ALLOWED_BLOCKS, CARD_STACK_DEFAULT_SETTINGS, ANIMATION_TYPES, ANIMATION_DIRECTIONS } from '../../utils/constants';

export default function save({ attributes }) {
    const {
        stackSpacing,
        backgroundColor,
        textColor,
        borderRadius,
        padding,
        currentCard,
        animationType,
        animationDirection,
    } = attributes;

    const blockProps = useBlockProps.save({
        style: {
            '--stack-spacing': `${stackSpacing}px`,
            '--background-color': backgroundColor,
            '--text-color': textColor,
            '--border-radius': `${borderRadius}px`,
            '--padding': `${padding}px`,
            '--animation-type': animationType,
            '--animation-direction': animationDirection,
            '--current-card': currentCard
        }
    });

    return (
        <div {...blockProps}>
            <div className="card-stack-container" data-animation-type={animationType} data-animation-direction={animationDirection}>
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
