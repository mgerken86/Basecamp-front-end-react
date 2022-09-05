import { render, screen } from '@testing-library/react';
import App from '../pages/App/App'

test('renders the landing page', () => {
  render(<App />);
});