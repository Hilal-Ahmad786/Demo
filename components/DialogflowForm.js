import { useState } from 'react';

const DialogflowForm = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/dialogflow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data.fulfillmentText);
            setError(''); // Clear any previous errors
        } catch (err) {
            console.error('Error during fetch:', err);
            setError('An error occurred while fetching the response.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask something..."
                />
                <button type="submit">Send</button>
            </form>
            {response && <p>Response: {response}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DialogflowForm;
