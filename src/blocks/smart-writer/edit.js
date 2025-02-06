import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Modal, TextareaControl, Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import useGroqAI from './useGroqAI';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';

export default function Edit({ clientId }) {
    const blockProps = useBlockProps();
    const [loading, setLoading] = useState(false);
    const [showPromptModal, setShowPromptModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [parsedBlocks, setParsedBlocks] = useState([]);
    const { askGroqAI } = useGroqAI();

    const handleGenerate = async () => {
        setLoading(true);
        setShowPromptModal(false);

        try {
            const response = await askGroqAI(userPrompt);
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

    useEffect(() => {
        if (generatedContent) {
            convertContentToBlocks(generatedContent).then(setParsedBlocks);
        }
    }, [generatedContent]);

    const convertContentToBlocks = async (content) => {
        try {
            const processor = unified()
                .use(remarkParse)
                .use(remarkGfm);

            const tree = processor.parse(content);
            const blocks = [];

            visit(tree, (node) => {
                switch (node.type) {
                    case 'heading':
                        blocks.push({
                            name: 'core/heading',
                            attributes: {
                                content: unified().use(remarkStringify).stringify(node).trim(),
                                level: node.depth
                            }
                        });
                        break;
                    case 'list':
                        blocks.push({
                            name: 'core/list',
                            attributes: {
                                values: node.children.map(item => unified().use(remarkStringify).stringify(item).trim()),
                                ordered: node.ordered
                            }
                        });
                        break;
                    case 'paragraph':
                        blocks.push({
                            name: 'core/paragraph',
                            attributes: {
                                content: unified().use(remarkStringify).stringify(node).trim()
                            }
                        });
                        break;
                    case 'code':
                        blocks.push({
                            name: 'core/code',
                            attributes: {
                                content: node.value
                            }
                        });
                        break;
                    case 'blockquote':
                        blocks.push({
                            name: 'core/quote',
                            attributes: {
                                value: unified().use(remarkStringify).stringify(node).trim()
                            }
                        });
                        break;
                }
            });

            return blocks.length ? blocks : [{
                name: 'core/paragraph',
                attributes: { content: content }
            }];

        } catch (error) {
            console.error('Markdown conversion error:', error);
            return [{
                name: 'core/paragraph',
                attributes: { content: __('Error formatting content', 'smart-flashcards') }
            }];
        }
    };

    const insertContent = async () => {
        if (parsedBlocks.length) {
            for (const blockConfig of parsedBlocks) {
                wp.data.dispatch('core/block-editor').insertBlock(
                    wp.blocks.createBlock(blockConfig.name, { content: blockConfig?.attributes?.content }),
                    clientId
                );
            }
        }

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
                <Modal title={__('Review Generated Content', 'smart-flashcards')} onRequestClose={() => setShowReviewModal(false)} style={{ minWidth: '800px' }}>
                    <div className="generated-content-preview">
                        {parsedBlocks.map((block, index) => (
                            <div key={index} className={`preview-${block.name.replace('core/', '')}`}>
                                {block.name === 'core/heading' ? <h3>{block.attributes.content}</h3> :
                                    block.name === 'core/list' ? <ul>{block.attributes.values.map((item, i) => <li key={i}>{item}</li>)}</ul> :
                                        block.name === 'core/quote' ? <blockquote>{block.attributes.value}</blockquote> :
                                            block.name === 'core/code' ? <pre><code>{block.attributes.content}</code></pre> :
                                                <p>{block.attributes.content}</p>}
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="primary" onClick={insertContent}>{__('Accept & Insert', 'smart-flashcards')}</Button>
                        <Button variant="secondary" onClick={() => setShowReviewModal(false)} style={{ marginLeft: '10px' }}>{__('Cancel', 'smart-flashcards')}</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
