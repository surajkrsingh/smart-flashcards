import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    
    return (
        <div {...blockProps}>
            <div className="flashcard-set-wrapper">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
