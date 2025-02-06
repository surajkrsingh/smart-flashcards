import { useState, useRef, useEffect } from 'react';
import OpenAI from "openai";

/**
 * Custom hook for interacting with Groq Fast AI.
 * Maintains conversation context and history for more coherent responses.
 */
const useGroqAI = () => {

    const API_KEY = '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';
    const MODEL = 'deepseek-r1-distill-llama-70b';
    const MAX_HISTORY_LENGTH = 10;

    // Store chat history in a ref to persist between renders
    const chatHistoryRef = useRef([]);

    // Initialize OpenAI client with Groq endpoint
    const clientRef = useRef(null);
    if (!clientRef.current) {
        clientRef.current = new OpenAI({
            apiKey: API_KEY,
            baseURL: 'https://api.groq.com/openai/v1',
            dangerouslyAllowBrowser: true
        });
    }

    const askGroqAI = async (query) => {
        if (!query.trim()) return;

        const inputText = query.trim();
        // Update chat history with user message
        chatHistoryRef?.current?.push({
            role: 'user',
            content: inputText
        });

        try {
            // Use OpenAI client to make the request
            const completion = await clientRef.current?.chat.completions.create({
                model: MODEL,
                messages: chatHistoryRef?.current?.slice(-MAX_HISTORY_LENGTH),
                temperature: 0.7,
                max_tokens: 4096,
                top_p: 1
            });

            const aiResponse = completion?.choices[0]?.message?.content || 'No response';

            // Update chat history with AI response
            chatHistoryRef?.current?.push({
                role: 'assistant',
                content: aiResponse
            });

            return aiResponse;

        } catch (error) {
            console.error('Error communicating with Groq AI:', error);
            return 'Error communicating with Groq AI';
        }
    };

    return { askGroqAI };
};

export default useGroqAI;
