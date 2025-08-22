import React from 'react';

const SearchResults = ({ results, loading }) => {
  if (loading) {
    return <div className="loading">Searching...</div>;
  }

  if (results.length === 0) {
    return <div className="no-results">No results found. Try a different search.</div>;
  }

  return (
    <div className="search-results">
      <h3>Results ({results.length})</h3>
      <div className="results-grid">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <img 
              src={result.thumbnail} 
              alt={result.title || 'Open license image'} 
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            <div className="result-info">
              <h4>{result.title || 'Untitled'}</h4>
              <p>By: {result.creator || 'Unknown'}</p>
              <p>License: {result.license}</p>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                View Original
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;