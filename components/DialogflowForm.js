import { useState } from 'react';

const DialogflowForm = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/dialogflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (res.ok) {
      const data = await res.json();
      setResponse(data.response); // Use the correct key 'response' as returned by the API
    } else {
      console.error('Error during fetch:', res.status);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default DialogflowForm;
