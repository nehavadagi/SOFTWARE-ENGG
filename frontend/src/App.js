import React, { useState } from 'react';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SavedSearches from './components/SavedSearches';
import './App.css';

const AppContent = () => {
    const { currentUser, logout } = useAuth();
    const [authMode, setAuthMode] = useState('login');
    const [showSaved, setShowSaved] = useState(false);

    if (!currentUser) {
        return (
            <div className="auth-container">
                {authMode === 'login' ? (
                    <Login onSwitchToRegister={() => setAuthMode('register')} />
                ) : (
                    <Register onSwitchToLogin={() => setAuthMode('login')} />
                )}
            </div>
        );
    }

    return (
        <div className="App">
            <header>
                <h1>Openverse Media Search</h1>
                <div className="user-menu">
                    <span>Welcome, {currentUser.username}</span>
                    <button onClick={() => setShowSaved(!showSaved)}>
                        Saved Searches
                    </button>
                    <button onClick={logout}>Logout</button>
                </div>
            </header>
            
            {showSaved && <SavedSearches />}
            
            <div className="search-container">
                {/* Your existing search functionality will go here */}
                <p>Search functionality coming soon...</p>
            </div>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;