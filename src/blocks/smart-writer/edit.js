import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Modal, TextareaControl, Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import useGroqAI from './useGroqAI';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export default function Edit({ clientId }) {
    const blockProps = useBlockProps();
    const [loading, setLoading] = useState(false);
    const [showPromptModal, setShowPromptModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const { askGroqAI } = useGroqAI();

    const handleGenerate = async () => {
        setLoading(true);
        setShowPromptModal(false);

        try {
            const response = await askGroqAI(userPrompt);
            const cleanString = response.replace(/<think[^>]*>.*?<\/think>/gs, ''); 
            convertMarkdownToHtml(cleanString).then(setHtmlContent);
            setShowReviewModal(true);
        } catch (error) {
            console.error('Generation error:', error);
            setHtmlContent(__('Error generating content', 'smart-flashcards'));
            setShowReviewModal(true);
        } finally {
            setLoading(false);
        }
    };

    const convertMarkdownToHtml = async (markdown) => {
        try {
            const result = await unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkHtml)
                .process(markdown);
            return result.toString();
        } catch (error) {
            console.error('Markdown to HTML conversion error:', error);
            return markdown;
        }
    };

    const insertContent = async () => {
        wp.data.dispatch('core/block-editor').insertBlock(
            wp.blocks.createBlock('core/paragraph', { content: htmlContent }),
            clientId
        );

        setShowReviewModal(false);
    };

    return (
        <div {...blockProps}>
            <Button variant="primary" onClick={() => setShowPromptModal(true)} disabled={loading}>
                {loading ? (<><Spinner /> {__('Generating...', 'smart-flashcards')}</>) : __('AI Smart Writer', 'smart-flashcards')}
            </Button>

            {showPromptModal && (
                <Modal title={__('AI Content Generator', 'smart-flashcards')} onRequestClose={() => setShowPromptModal(false)}>
                    <TextareaControl label={__('Enter your prompt:', 'smart-flashcards')} value={userPrompt} onChange={setUserPrompt} rows={4} />
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="primary" onClick={handleGenerate}>{__('Generate Content', 'smart-flashcards')}</Button>
                        <Button variant="secondary" onClick={() => setShowPromptModal(false)} style={{ marginLeft: '10px' }}>{__('Cancel', 'smart-flashcards')}</Button>
                    </div>
                </Modal>
            )}

            {showReviewModal && (
                <Modal 
                    title={__('Review Generated Content', 'smart-flashcards')} 
                    onRequestClose={() => setShowReviewModal(false)}
                    style={{ width: '800px', maxWidth: '100%' }}
                >
                    <div className="generated-content-preview" style={{
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        padding: '20px',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        margin: '10px 0'
                    }}>
                        <div 
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                            style={{
                                '& h1, & h2, & h3, & h4, & h5, & h6': {
                                    margin: '1em 0 0.5em',
                                    lineHeight: '1.4'
                                },
                                '& p': {
                                    margin: '0 0 1em',
                                    lineHeight: '1.6'
                                },
                                '& ul, & ol': {
                                    marginBottom: '1em',
                                    paddingLeft: '2em'
                                },
                                '& li': {
                                    margin: '0.5em 0'
                                }
                            }}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button 
                            variant="primary" 
                            onClick={insertContent}
                        >
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
