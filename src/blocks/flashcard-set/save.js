import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Save({ attributes }) {
    const { displayMode, enableShuffle } = attributes;
    const blockProps = useBlockProps.save({
        'data-display-mode': displayMode,
        'data-enable-shuffle': enableShuffle
    });

    return (
        <div {...blockProps}>
            <div className="flashcard-set-wrapper">
                <div className="flashcard-set-slides">
                    <div className="flashcard-set-track">
                        <InnerBlocks.Content />
                    </div>
                </div>
                <div className="flashcard-set-nav">
                    {enableShuffle && (
                        <button 
                            type="button" 
                            className="flashcard-shuffle-button"
                            aria-label={__('Shuffle flashcards', 'smart-flashcards')}
                        >
                            <span className="dashicons dashicons-randomize"></span>
                            {__('Shuffle', 'smart-flashcards')}
                        </button>
                    )}
                    <button 
                        type="button" 
                        className="flashcard-nav-button prev"
                        aria-label={__('Previous flashcard', 'smart-flashcards')}
                    >
                        <span className="dashicons dashicons-arrow-left-alt2"></span>
                        {__('Previous', 'smart-flashcards')}
                    </button>
                    <span className="flashcard-set-counter">1 / 1</span>
                    <button 
                        type="button" 
                        className="flashcard-nav-button next"
                        aria-label={__('Next flashcard', 'smart-flashcards')}
                    >
                        {__('Next', 'smart-flashcards')}
                        <span className="dashicons dashicons-arrow-right-alt2"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}
