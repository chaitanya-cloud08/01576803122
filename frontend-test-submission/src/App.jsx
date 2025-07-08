
import { useState } from 'react';
import { Log } from './log';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    setError('');
    setShortened('');

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Non-JSON response:\n' + text);
      }

      if (data.error) {
        setError(data.error);
        await Log("Frontend", "error", "URLShortener", data.error);
      } else {
        setShortened(data.shortened_url);
        await Log("Frontend", "info", "URLShortener", `Shortened: ${data.shortened_url}`);
      }
    } catch (err) {
      setError('Something went wrong');
      await Log("Frontend", "error", "URLShortener", err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>URL Shortener</h1>
        <input
          className="input"
          type="text"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="button" onClick={handleShorten}>
          Shorten URL
        </button>

        {shortened && (
          <div className="result">
            <div className="label">Shortened URL:</div>
            <a className="link" href={shortened} target="_blank" rel="noreferrer">
              {shortened}
            </a>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;
