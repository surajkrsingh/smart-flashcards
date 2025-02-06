import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import useGroqAI from './useGroqAI';

export default function Edit({ clientId }) {
    const blockProps = useBlockProps();
    const [loading, setLoading] = useState(false);
    const [responseText, setResponseText] = useState('');
    const { askGroqAI } = useGroqAI();

    const generateText = async () => {
        setLoading(true);

        try {
            const response = await askGroqAI('Write a short paragraph about...');

            if (response) {
                console.log('AI Response:', response);
                wp.data.dispatch('core/block-editor').insertBlock(
                    wp.blocks.createBlock('core/paragraph', { content: response }),
                    clientId
                );
            } else {
                console.error('Error: AI response is empty or undefined');
            }

        } catch (error) {
            console.error('Error generating text:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div {...blockProps}>
            <Button
                variant="primary"
                onClick={generateText}
                disabled={loading}
            >
                {loading ? __('Generating Text...', 'smart-flashcards') : __('Generate Text with AI', 'smart-flashcards')}
            </Button>
        </div>
    );
} 
