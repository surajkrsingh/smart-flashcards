import { useState, useRef, useEffect } from 'react';
import OpenAI from "openai";

/**
 * Custom hook for interacting with Groq Fast AI.
 * Maintains conversation context and history for more coherent responses.
 */
const useGroqAI = () => {
    const API_KEY = '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';
    const MAX_HISTORY_LENGTH = 10;

    // Available models grouped by provider.
    const AVAILABLE_MODELS = {
        'DeepSeek / Meta': {
            'deepseek-r1-distill-llama-70b': 'DeepSeek Llama 70B'
        },
        'Google': {
            'gemma2-9b-it': 'Gemma2 9B'
        },
        'Meta': {
            'llama-3.3-70b-specdec': 'LLaMA 3.3 70B SpecDec',
            'llama-3.3-70b-versatile': 'LLaMA 3.3 70B Versatile',
            'llama-3.2-3b-preview': 'LLaMA 3.2 3B Preview',
            'llama-3.2-1b-preview': 'LLaMA 3.2 1B Preview',
            'llama-3.1-8b-instant': 'LLaMA 3.1 8B Instant',
            'llama3-70b-8192': 'LLaMA3 70B',
            'llama3-8b-8192': 'LLaMA3 8B'
        },
        'Mistral AI': {
            'mixtral-8x7b-32768': 'Mixtral 8x7B'
        }
    };

    // Flatten models for SelectControl
    const getFlattenedModels = () => {
        const options = [];
        Object.entries(AVAILABLE_MODELS).forEach(([provider, models]) => {
            options.push({
                label: `── ${provider} ──`,
                disabled: true
            });
            Object.entries(models).forEach(([value, label]) => {
                options.push({ value, label });
            });
        });
        return options;
    };

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

    const askGroqAI = async (query, model = 'deepseek-r1-distill-llama-70b') => {
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
                model: model,
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

    return {
        askGroqAI,
        AVAILABLE_MODELS,
        getFlattenedModels
    };
};

export default useGroqAI;
