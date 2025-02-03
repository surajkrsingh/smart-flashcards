import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Save() {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="flashcard-set-wrapper">
                <div className="flashcard-set-slides">
                    <InnerBlocks.Content />
                </div>
                <div className="flashcard-set-nav">
                    <button 
                        type="button" 
                        className="flashcard-nav-button prev"
                        aria-label={__('Previous flashcard', 'smart-flashcards')}
                        disabled
                    >
                        <span className="dashicons dashicons-arrow-left-alt2"></span>
                        {__('Previous', 'smart-flashcards')}
                    </button>
                    <span className="flashcard-set-counter">1 / 1</span>
                    <button 
                        type="button" 
                        className="flashcard-nav-button next"
                        aria-label={__('Next flashcard', 'smart-flashcards')}
                        disabled
                    >
                        {__('Next', 'smart-flashcards')}
                        <span className="dashicons dashicons-arrow-right-alt2"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}
