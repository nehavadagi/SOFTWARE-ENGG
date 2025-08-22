import React, { useState, useEffect } from 'react';
import { searchAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const SearchHistory = ({ onSelectHistory }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSearchHistory();
    }
  }, [user]);

  const fetchSearchHistory = async () => {
    try {
      const response = await searchAPI.getHistory({ per_page: 10 });
      setHistory(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch search history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (id) => {
    try {
      await searchAPI.deleteHistory(id);
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete history item:', error);
    }
  };

  if (!user) {
    return (
      <div className="search-history">
        <h3>Search History</h3>
        <p>Please log in to view your search history.</p>
      </div>
    );
  }

  return (
    <div className="search-history">
      <h3>Recent Searches</h3>
      {loading ? (
        <p>Loading history...</p>
      ) : history.length === 0 ? (
        <p>No search history yet.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.id} className="history-item">
              <span 
                className="history-query" 
                onClick={() => onSelectHistory(item)}
                title="Click to search again"
              >
                {item.query}
              </span>
              <button 
                onClick={() => handleDeleteHistory(item.id)}
                className="delete-btn"
                title="Delete this search"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistory;