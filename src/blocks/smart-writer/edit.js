import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, Modal, TextareaControl, Spinner, SelectControl, PanelBody, TabPanel } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import useGroqAI from './useGroqAI';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { RichTextContent } from '@wordpress/rich-text';

export default function Edit({ attributes, setAttributes, clientId }) {
    const blockProps = useBlockProps();
    const [loading, setLoading] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [editableContent, setEditableContent] = useState('');
    const { askGroqAI, getFlattenedModels } = useGroqAI();
    const { selectedModel } = attributes;
    const { insertBlocks, removeBlock } = useDispatch('core/block-editor');
    const { getBlockRootClientId } = useSelect(select => select('core/block-editor'));
    const [activeEditor, setActiveEditor] = useState('visual');

    // Modify handleTextareaChange to prevent new lines
    const handleTextareaChange = (value) => {
        // Remove any newline characters
        const singleLineValue = value.replace(/\n/g, '');
        setUserPrompt(singleLineValue);
    };

    const handleGenerate = async () => {
        if (!userPrompt.trim()) return;
        
        setLoading(true);

        try {
            const response = await askGroqAI(userPrompt, selectedModel);
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

    const insertContent = () => {
        if (!editableContent) return;

        // Get the parent block's clientId (if any)
        const parentClientId = getBlockRootClientId(clientId);

        // Create a new paragraph block with the generated content
        const newBlock = createBlock('core/paragraph', {
            content: editableContent,
        });

        // Insert the new block after the current block
        insertBlocks(newBlock, undefined, parentClientId);

        // Close the review modal
        setShowReviewModal(false);
        
        // Clear the content
        setEditableContent('');
        setHtmlContent('');
        setUserPrompt('');
    };

    const renderEditorTabs = () => {
        const tabs = [
            {
                name: 'visual',
                title: __('Visual Editor', 'smart-flashcards'),
                className: 'smart-writer-tab visual-editor-tab',
            },
            {
                name: 'html',
                title: __('HTML Editor', 'smart-flashcards'),
                className: 'smart-writer-tab html-editor-tab',
            }
        ];

        return (
            <TabPanel
                className="smart-writer-tabs"
                activeClass="is-active"
                tabs={tabs}
                onSelect={(tabName) => setActiveEditor(tabName)}
            >
                {(tab) => (
                    <div className="smart-writer-tab-content">
                        {tab.name === 'visual' ? (
                            <RichText
                                value={editableContent}
                                onChange={setEditableContent}
                                placeholder={__('Generated content will appear here...', 'smart-flashcards')}
                                className="smart-writer-visual-editor"
                            />
                        ) : (
                            <TextareaControl
                                value={editableContent}
                                onChange={setEditableContent}
                                rows={15}
                                className="smart-writer-html-editor"
                            />
                        )}
                    </div>
                )}
            </TabPanel>
        );
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('AI Model Settings', 'smart-flashcards')}
                    initialOpen={true}
                >
                    <SelectControl
                        label={__('Select AI Model', 'smart-flashcards')}
                        value={selectedModel}
                        options={getFlattenedModels()}
                        onChange={(model) => setAttributes({ selectedModel: model })}
                        help={__('Choose the AI model to generate content.', 'smart-flashcards')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="smart-writer-prompt-container">
                    <div className="smart-writer-input-wrapper">
                        <div className="smart-writer-textarea-container">
                            <TextareaControl
                                value={userPrompt}
                                onChange={handleTextareaChange}
                                placeholder={__('Ask AI to write something...', 'smart-flashcards')}
                                className="smart-writer-textarea"
                                rows={1}
                            />
                        </div>
                        <Button 
                            variant="primary" 
                            onClick={handleGenerate} 
                            disabled={loading || !userPrompt.trim()}
                            className={`smart-writer-generate-button ${loading ? 'is-loading' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <Spinner className="smart-writer-spinner" />
                                    <span>{__('Generating...', 'smart-flashcards')}</span>
                                </>
                            ) : (
                                <span>{__('Generate', 'smart-flashcards')}</span>
                            )}
                        </Button>
                    </div>
                </div>

                {showReviewModal && (
                    <Modal 
                        title={__('Review Generated Content', 'smart-flashcards')} 
                        onRequestClose={() => setShowReviewModal(false)}
                        className="smart-writer-modal"
                        style={{ width: '800px', maxWidth: '100%' }}
                    >
                        <div className="smart-writer-modal-content">
                            <div className="generated-content-preview" style={{
                                maxHeight: '60vh',
                                overflowY: 'auto',
                                backgroundColor: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '20px',
                            }}>
                                {renderEditorTabs()}
                            </div>
                            <div className="smart-writer-modal-footer">
                                <Button 
                                    variant="primary" 
                                    onClick={insertContent}
                                    className="smart-writer-accept-button"
                                >
                                    {__('Accept & Insert', 'smart-flashcards')}
                                </Button>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => setShowReviewModal(false)} 
                                    className="smart-writer-cancel-button"
                                >
                                    {__('Cancel', 'smart-flashcards')}
                                </Button>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    );
}
