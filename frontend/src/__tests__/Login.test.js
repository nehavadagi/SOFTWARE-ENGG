// frontend/src/__tests__/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from '../components/Auth/Login';

jest.mock('axios');

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login onLogin={() => {}} />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const mockOnLogin = jest.fn();
    axios.post.mockResolvedValue({
      data: {
        access_token: 'mock-token',
        user: { id: 1, username: 'testuser', email: 'test@example.com' }
      }
    });

    render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalled();
    });
  });
});