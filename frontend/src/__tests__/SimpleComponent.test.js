// src/__tests__/SimpleComponent.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create a simple test component
const TestComponent = () => (
  <div>
    <h1>Test Heading</h1>
    <button>Click me</button>
  </div>
);

test('renders test component', () => {
  render(<TestComponent />);
  
  expect(screen.getByText('Test Heading')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});