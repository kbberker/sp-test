import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const page = render(<App />);
  expect(page).toMatchSnapshot();
});
