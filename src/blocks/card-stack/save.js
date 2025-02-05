import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        stackSpacing,
        backgroundColor,
        textColor,
        borderRadius,
        padding
    } = attributes;

    const blockProps = useBlockProps.save({
        style: {
            '--stack-spacing': `${stackSpacing}px`,
            '--background-color': backgroundColor,
            '--text-color': textColor,
            '--border-radius': `${borderRadius}px`,
            '--padding': `${padding}px`
        }
    });

    return (
        <div {...blockProps}>
            <div className="card-stack-container">
                <InnerBlocks.Content />
            </div>
        </div>
    );
} 