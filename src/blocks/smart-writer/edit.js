import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
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
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [editableContent, setEditableContent] = useState('');
    const { askGroqAI } = useGroqAI();

    // Add state for textarea height
    const [textareaHeight, setTextareaHeight] = useState('24px');

    // Handle textarea height adjustment
    const handleTextareaChange = (value) => {
        setUserPrompt(value);
        const lines = value.split('\n').length;
        const newHeight = Math.min(Math.max(lines * 24, 24), 120) + 'px';
        setTextareaHeight(newHeight);
    };

    const handleGenerate = async () => {
        if (!userPrompt.trim()) return;
        
        setLoading(true);

        try {
            const response = await askGroqAI(userPrompt);
            const cleanString = response.replace(/<think[^>]*>.*?<\/think>/gs, ''); 
            const html = await convertMarkdownToHtml(cleanString);

            // Create a temporary div to handle HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Process the content for RichText
            const processedContent = Array.from(tempDiv.children)
                .map(element => {
                    switch (element.tagName.toLowerCase()) {
                        case 'h1':
                        case 'h2':
                        case 'h3':
                        case 'h4':
                        case 'h5':
                        case 'h6':
                            return element.innerHTML + '\n\n';
                        case 'ul':
                            return Array.from(element.children)
                                .map(li => '• ' + li.innerHTML)
                                .join('\n') + '\n\n';
                        case 'ol':
                            return Array.from(element.children)
                                .map((li, index) => `${index + 1}. ` + li.innerHTML)
                                .join('\n') + '\n\n';
                        case 'p':
                            return element.innerHTML + '\n\n';
                        default:
                            return element.innerHTML;
                    }
                })
                .join('')
                .trim();

            setHtmlContent(html);
            setEditableContent(processedContent);
            setShowReviewModal(true);
            setUserPrompt(''); // Clear the prompt after generation
        } catch (error) {
            console.error('Generation error:', error);
            setHtmlContent(__('Error generating content', 'smart-flashcards'));
            setEditableContent(__('Error generating content', 'smart-flashcards'));
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
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = editableContent;

        wp.data.dispatch('core/block-editor').insertBlock(
            wp.blocks.createBlock('core/paragraph', { content: tempDiv.textContent }),
            clientId
        );

        setShowReviewModal(false);
    };

    return (
        <div {...blockProps}>
            <div style={{
                position: 'relative',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                '&:focus-within': {
                    borderColor: '#2271b1',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    backgroundColor: '#fff',
                    padding: '12px 16px',
                    gap: '12px'
                }}>
                    <div style={{
                        flex: '1 1 auto',
                        position: 'relative',
                        minHeight: '24px'
                    }}>
                        <TextareaControl
                            value={userPrompt}
                            onChange={handleTextareaChange}
                            placeholder={__('Write a prompt here...', 'smart-flashcards')}
                            style={{
                                margin: 0,
                                padding: '0',
                                border: 'none',
                                borderRadius: 0,
                                resize: 'none',
                                height: textareaHeight,
                                minHeight: '24px',
                                maxHeight: '120px',
                                width: '100%',
                                lineHeight: '24px',
                                fontSize: '15px',
                                color: '#1e1e1e',
                                backgroundColor: 'transparent',
                                overflow: 'hidden',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                '&:focus': {
                                    boxShadow: 'none',
                                    outline: 'none'
                                },
                                '&::placeholder': {
                                    color: '#6e6e6e'
                                }
                            }}
                            rows={1}
                        />
                        {/* Hidden div to calculate height */}
                        <div style={{
                            visibility: 'hidden',
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            height: textareaHeight
                        }}>
                            {userPrompt + '\n'}
                        </div>
                    </div>
                    <Button 
                        variant="primary" 
                        onClick={handleGenerate} 
                        disabled={loading || !userPrompt.trim()}
                        style={{
                            flexShrink: 0,
                            height: '40px',
                            padding: '0 20px',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            minWidth: loading ? '120px' : '90px',
                            justifyContent: 'center',
                            backgroundColor: '#2271b1',
                            color: '#fff',
                            transition: 'all 0.2s ease',
                            '&:hover:not(:disabled)': {
                                backgroundColor: '#135e96'
                            },
                            '&:disabled': {
                                backgroundColor: '#e0e0e0',
                                color: '#757575',
                                cursor: 'not-allowed'
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <Spinner style={{
                                    width: '16px',
                                    height: '16px',
                                    margin: 0,
                                    borderWidth: '2px',
                                    opacity: 0.8
                                }}/>
                                <span>{__('Generating...', 'smart-flashcards')}</span>
                            </>
                        ) : (
                            <span>{__('Generate', 'smart-flashcards')}</span>
                        )}
                    </Button>
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.02))'
                }}/>
            </div>

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
                        <TextareaControl
                            value={editableContent}
                            onChange={setEditableContent}
                            rows={15}
                            style={{
                                width: '100%',
                                minHeight: '300px',
                                fontFamily: 'inherit',
                                fontSize: '14px',
                                lineHeight: '1.6'
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
