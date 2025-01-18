import React, { useState } from 'react';

function GeminiLLM() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleQuery = async () => {
        if (!prompt) {
            setError('Please enter a prompt.');
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const apiKey = 'API KEY'; // Replace with your actual API key
            const endpoint = 'https://api.generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText';

            const requestBody = {
                prompt: { text: prompt },
                temperature: 0.7,
                maxOutputTokens: 256,
            };

            const response = await fetch(`${endpoint}?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            setResponse(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Google Gemini LLM API</h1>
            <div>
        <textarea
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            cols={50}
        />
                <br />
                <button onClick={handleQuery}>Submit</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {response && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default GeminiLLM;
