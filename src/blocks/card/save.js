import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { index } = attributes;

    const blockProps = useBlockProps.save({
        className: 'wp-block-smfcs-card'
    });

    return (
        <div {...blockProps}>
            {index && <div className="card-index">{index}</div>}
            <div className="card-content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
} 