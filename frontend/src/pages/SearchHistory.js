import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import './SearchHistory.css';

const SearchHistory = () => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();

  const fetchSearchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/search/history?page=${currentPage}&limit=10`);
      setSearches(response.data.searches);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Failed to fetch search history');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchSearchHistory();
  }, [fetchSearchHistory]);

  const deleteSearch = async (searchId) => {
    try {
      await api.delete(`/search/history/${searchId}`);
      setSearches(searches.filter(search => search._id !== searchId));
    } catch (error) {
      setError('Failed to delete search');
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading your search history...</div>;
  }

  return (
    <div className="search-history-container">
      <div className="search-history-header">
        <h1>Your Search History</h1>
        <p>View and manage your saved searches</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {searches.length === 0 ? (
        <div className="empty-state">
          <h3>No searches yet</h3>
          <p>Your search history will appear here once you start searching.</p>
        </div>
      ) : (
        <>
          <div className="searches-list">
            {searches.map((search) => (
              <div key={search._id} className="search-item">
                <div className="search-info">
                  <h4 className="search-query">"{search.query}"</h4>
                  <p className="search-date">{formatDate(search.createdAt)}</p>
                  <div className="search-filters">
                    {search.filters.source && (
                      <span className="filter-tag">Source: {search.filters.source}</span>
                    )}
                    {search.filters.license_type && (
                      <span className="filter-tag">License: {search.filters.license_type}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteSearch(search._id)}
                  className="delete-btn"
                  title="Delete this search"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchHistory;