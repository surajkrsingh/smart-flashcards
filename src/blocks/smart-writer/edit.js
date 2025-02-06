import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Modal, TextareaControl, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';
import useGroqAI from './useGroqAI';
import { removeInvalidHTML } from '@wordpress/dom';

export default function Edit({ clientId }) {
    const blockProps = useBlockProps();
    const [loading, setLoading] = useState(false);
    const [showPromptModal, setShowPromptModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const { askGroqAI } = useGroqAI();

    const handleGenerate = async () => {
        setLoading(true);
        setShowPromptModal(false);
        
        try {
            const response = await askGroqAI(userPrompt);

            // const sanitizedResponse = response
            //     ? removeInvalidHTML(response, '<strong><em><a>', (tag) => tag)
            //     : __('No content generated', 'smart-flashcards');
            
            console.log('Sanitized Response:', response);
            setGeneratedContent(response);
            setShowReviewModal(true);

        } catch (error) {
            console.error('Generation error:', error);
            setGeneratedContent(__('Error generating content', 'smart-flashcards'));
            setShowReviewModal(true);
        } finally {
            setLoading(false);
        }
    };

    const insertContent = () => {
        if (generatedContent) {
            const paragraphs = generatedContent.split('\n\n').filter(p => p.trim());
            
            paragraphs.forEach(content => {
                wp.data.dispatch('core/block-editor').insertBlock(
                    wp.blocks.createBlock('core/paragraph', { content }),
                    clientId
                );
            });
        }
        setShowReviewModal(false);
    };

    return (
        <div {...blockProps}>
            <Button
                variant="primary"
                onClick={() => setShowPromptModal(true)}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Spinner />
                        {__('Generating...', 'smart-flashcards')}
                    </>
                ) : __('AI Smart Writer', 'smart-flashcards')}
            </Button>

            {showPromptModal && (
                <Modal
                    title={__('AI Content Generator', 'smart-flashcards')}
                    onRequestClose={() => setShowPromptModal(false)}
                >
                    <TextareaControl
                        label={__('Enter your prompt:', 'smart-flashcards')}
                        value={userPrompt}
                        onChange={setUserPrompt}
                        rows={4}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="primary" onClick={handleGenerate}>
                            {__('Generate Content', 'smart-flashcards')}
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={() => setShowPromptModal(false)}
                            style={{ marginLeft: '10px' }}
                        >
                            {__('Cancel', 'smart-flashcards')}
                        </Button>
                    </div>
                </Modal>
            )}

            {showReviewModal && (
                <Modal
                    title={__('Review Generated Content', 'smart-flashcards')}
                    onRequestClose={() => setShowReviewModal(false)}
                    style={{ minWidth: '600px' }}
                >
                    <div className="generated-content-preview">
                        {/* {generatedContent.split(/\n{2,}/).map((paragraph, index) => (
                            <div 
                                key={index}
                                dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br />') }}
                            />
                        ))} */}
                        {generatedContent}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="primary" onClick={insertContent}>
                            {__('Accept & Insert', 'smart-flashcards')}
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={() => setShowReviewModal(false)}
                            style={{ marginLeft: '10px' }}
                        >
                            {__('Cancel', 'smart-flashcards')}
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
} 
