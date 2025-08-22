import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search Open Media/i); // Find your heading text
  expect(linkElement).toBeInTheDocument();
});