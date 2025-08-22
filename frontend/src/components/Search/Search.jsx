import React, { useState, useEffect } from 'react';
import { searchAPI } from '../../services/api';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import SearchHistory from './SearchHistory';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    license: 'all',
    image_type: 'all',
    page: 1
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (searchQuery = query, searchFilters = filters) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await searchAPI.search({
        q: searchQuery,
        ...searchFilters
      });
      setResults(response.data.results || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    handleSearch(query, newFilters);
  };

  const handleSearchFromHistory = (historyItem) => {
    setQuery(historyItem.query);
    setFilters(historyItem.filters || { license: 'all', image_type: 'all', page: 1 });
    handleSearch(historyItem.query, historyItem.filters);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Search Open License Media</h2>
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={() => handleSearch()} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="search-content">
        <div className="search-sidebar">
          <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
          <SearchHistory onSelectHistory={handleSearchFromHistory} />
        </div>

        <div className="search-main">
          {error && <div className="error-message">{error}</div>}
          <SearchResults results={results} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Search;