import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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