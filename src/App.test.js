import { render, screen } from '@testing-library/react';
import App from './App';

describe('App simple smoke test', () => {
  xtest('renders Students header', () => {
    render(<App />);
    const linkElement = screen.getByText(/Students/i);
    expect(linkElement).toBeInTheDocument();
  });
});
