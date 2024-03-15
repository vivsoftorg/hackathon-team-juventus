import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component without crashing', () => {
  render(<App />);
  
  // Check for specific elements or components that should be rendered
  const homeLinkElement = screen.getByText(/List Modals/i);
  const TarsLinkElement = screen.getByText(/Tars/i);

  expect(homeLinkElement).toBeInTheDocument();
  expect(TarsLinkElement).toBeInTheDocument();
});
