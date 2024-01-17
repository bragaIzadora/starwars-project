import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('App data-testid', () => {
  render(<App />);

  expect(screen.getByTestId('name-filter')).toBeInTheDocument();

  expect(screen.getByTestId('button-filter')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('button-filter'));

});



