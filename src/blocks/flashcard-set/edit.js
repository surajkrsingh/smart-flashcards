import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

const ALLOWED_BLOCKS = ['smfcs/flashcard'];
const TEMPLATE = [['smfcs/flashcard']];

export default function Edit({ attributes, setAttributes, clientId }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const blockProps = useBlockProps();
    const { insertBlock } = useDispatch('core/block-editor');
    
    const { innerBlocks } = useSelect((select) => ({
        innerBlocks: select('core/block-editor').getBlocks(clientId)
    }), [clientId]);

    useEffect(() => {
        const editorDom = document.querySelector('.block-editor-block-list__layout');
        if (editorDom) {
            editorDom.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }, [currentSlide]);

    const handleAddFlashcard = () => {
        insertBlock('smfcs/flashcard', innerBlocks.length, clientId, false)
            .then(() => {
                setCurrentSlide(innerBlocks.length);
            });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Flashcard Management', 'smart-flashcards')}>
                    <div className="flashcard-set-controls">
                        <Button
                            variant="primary"
                            onClick={handleAddFlashcard}
                            style={{ marginBottom: '15px' }}
                        >
                            {__('Add New Flashcard', 'smart-flashcards')}
                        </Button>
                        
                        <div className="flashcard-set-count">
                            {__('Total Flashcards:', 'smart-flashcards')} {innerBlocks.length}
                        </div>
                    </div>
                </PanelBody>
            </InspectorControls>

            <div className="flashcard-set-wrapper">
                <div className="flashcard-set-nav">
                    <Button 
                        variant="secondary"
                        disabled={currentSlide === 0}
                        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    >
                        ←
                    </Button>
                    
                    <span>{__(`Card ${currentSlide + 1} of ${innerBlocks.length}`, 'smart-flashcards')}</span>
                    
                    <Button 
                        variant="secondary"
                        disabled={currentSlide >= innerBlocks.length - 1}
                        onClick={() => setCurrentSlide(Math.min(innerBlocks.length - 1, currentSlide + 1))}
                    >
                        →
                    </Button>
                </div>

                <div className="flashcard-set-slides">
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        templateLock={false}
                        orientation="horizontal"
                    />
                </div>
            </div>
        </div>
    );
}
