import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { index } = attributes;

    const blockProps = useBlockProps.save({
        className: 'wp-block-smfcs-card'
    });

    return (
        <div {...blockProps}>
            <div className="card-content" data-index={index}>
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
