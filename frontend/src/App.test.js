import { render, screen } from '@testing-library/react';
import App from './App';
import MemoryRouter from "react-router-dom";

test('renders Welcome', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});
