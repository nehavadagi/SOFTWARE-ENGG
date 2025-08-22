import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavedSearches = () => {
    const [searches, setSearches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedSearches();
    }, []);

    const fetchSavedSearches = async () => {
        try {
            const response = await axios.get('http://localhost:5000/saved-searches');
            setSearches(response.data);
        } catch (error) {
            console.error('Error fetching saved searches:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteSearch = async (searchId) => {
        try {
            await axios.delete(`http://localhost:5000/saved-searches/${searchId}`);
            setSearches(searches.filter(search => search._id !== searchId));
        } catch (error) {
            console.error('Error deleting search:', error);
        }
    };

    if (loading) return <div>Loading saved searches...</div>;

    return (
        <div className="saved-searches">
            <h3>Your Saved Searches</h3>
            {searches.length === 0 ? (
                <p>No saved searches yet.</p>
            ) : (
                <ul>
                    {searches.map((search) => (
                        <li key={search._id}>
                            <span>{search.query}</span>
                            <small>{new Date(search.saved_at).toLocaleDateString()}</small>
                            <button onClick={() => deleteSearch(search._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SavedSearches;