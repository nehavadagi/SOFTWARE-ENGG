import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            
            const { access_token, user_id, username: userUsername } = response.data;
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify({ id: user_id, username: userUsername }));
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            setCurrentUser({ id: user_id, username: userUsername });
            
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || 'Login failed' };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                email,
                password
            });
            return { success: true, message: response.data.message };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};