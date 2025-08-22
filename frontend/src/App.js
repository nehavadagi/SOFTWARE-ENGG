import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Fixed import
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Search from './components/Search/Search';
import './App.css';

const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="auth-container">
        {isLogin ? (
          <Login onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    );
  }

  return <Search />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <h1>Open License Media Search</h1>
        </header>
        <main>
          <AuthWrapper />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;