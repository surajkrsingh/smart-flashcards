import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import './editor.scss';

const ALLOWED_BLOCKS = ['smfcs/flashcard'];
const TEMPLATE = [
    ['smfcs/flashcard']
];

export default function Edit({ attributes, setAttributes, clientId }) {
    const { currentSlide } = attributes;
    const blockProps = useBlockProps();

    // Get inner blocks count using useSelect
    const { innerBlocks } = useSelect(select => ({
        innerBlocks: select('core/block-editor').getBlocks(clientId)
    }), [clientId]);

    const totalSlides = innerBlocks?.length || 0;

    const handlePrev = () => {
        setAttributes({ 
            currentSlide: Math.max(0, currentSlide - 1)
        });
    };

    const handleNext = () => {
        setAttributes({ 
            currentSlide: Math.min(totalSlides - 1, currentSlide + 1)
        });
    };

    return (
        <div {...blockProps}>
            <div className="flashcard-set-wrapper">
                <div 
                    className="flashcard-set-slides"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`
                    }}
                >
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        orientation="horizontal"
                        renderAppender={InnerBlocks.ButtonBlockAppender}
                    />
                </div>

                <div className="flashcard-set-nav">
                    <Button 
                        variant="secondary"
                        onClick={handlePrev}
                        disabled={currentSlide === 0}
                        icon="arrow-left-alt2"
                        className="flashcard-nav-button prev"
                    >
                        {__('Previous', 'smart-flashcards')}
                    </Button>
                    <span className="flashcard-set-counter">
                        {currentSlide + 1} / {totalSlides || 1}
                    </span>
                    <Button 
                        variant="secondary"
                        onClick={handleNext}
                        disabled={currentSlide === totalSlides - 1}
                        icon="arrow-right-alt2"
                        iconPosition="right"
                        className="flashcard-nav-button next"
                    >
                        {__('Next', 'smart-flashcards')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
