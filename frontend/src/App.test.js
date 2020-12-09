import { render, screen } from '@testing-library/react';

import LoginPage from "./components/pages/LoginPage";
import {MemoryRouter as Router} from "react-router-dom";

test('Login', () => {
  render(<Router><LoginPage /></Router>);
  const linkElement = screen.getByPlaceholderText('Username');
  expect(linkElement).toBeInTheDocument();
});
