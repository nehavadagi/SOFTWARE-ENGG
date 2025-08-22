// frontend/src/components/History/SearchHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchHistory = () => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/searches', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSearches(response.data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSearch = async (searchId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/searches/${searchId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSearches(searches.filter(search => search.id !== searchId));
    } catch (error) {
      console.error('Error deleting search:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="search-history">
      <h3>Search History</h3>
      {searches.length === 0 ? (
        <p>No search history found</p>
      ) : (
        <ul>
          {searches.map(search => (
            <li key={search.id}>
              <div className="search-item">
                <span className="query">{search.query}</span>
                <span className="date">
                  {new Date(search.created_at).toLocaleDateString()}
                </span>
                <span className="results">{search.results_count} results</span>
                <button 
                  onClick={() => deleteSearch(search.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
              {search.filters && (
                <div className="filters">
                  Filters: {JSON.stringify(search.filters)}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistory;