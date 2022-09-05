import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage/HomePage'

test('renders the landing page', () => {
  render(<HomePage />);
});