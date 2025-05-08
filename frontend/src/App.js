import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    try {
      const res = await axios.get(`${apiUrl}/search?q=${encodeURIComponent(query)}`);
      console.log("Results from backend:", res.data.results);
      setResults(res.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Openverse Image Search</h2>
      <input
        type="text"
        value={query}
        placeholder="Enter search term..."
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: '1rem', padding: '0.5rem', width: '250px' }}
      />
      <button onClick={search} style={{ padding: '0.5rem 1rem' }}>
        Search
      </button>

      <div style={{ marginTop: '2rem' }}>
        {results.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {results.map((item) => (
              <div key={item.id}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ width: 150, height: 150, objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No results yet</p>
        )}
      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;