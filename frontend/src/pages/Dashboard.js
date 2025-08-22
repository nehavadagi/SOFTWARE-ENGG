import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/search', {
        query: query.trim(),
        filters: {
          license_type: 'commercial,modification'
        }
      });
      
      setResults(response.data.results.results || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Search failed');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.username}! 👋</h1>
        <p>Search for openly licensed media from Openverse</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images... (e.g., nature, animals, technology)"
            disabled={loading}
            className="search-input"
          />
          <button 
            type="submit" 
            disabled={loading || !query.trim()}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="results-grid">
        {results.map((result) => (
          <div key={result.id} className="result-card">
            <img 
              src={result.thumbnail} 
              alt={result.title} 
              className="result-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=Image+Not+Found';
              }}
            />
            <div className="result-info">
              <h4>{result.title || 'Untitled'}</h4>
              <p>By: {result.creator || 'Unknown'}</p>
              <p>License: {result.license || 'Not specified'}</p>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && query && (
        <div className="no-results">
          <p>No results found for "{query}". Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;