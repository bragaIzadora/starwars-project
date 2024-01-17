import React from 'react';
import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumericFilters from '../components/starwarsNumericFilters';

test('App data-testid', () => {
  render(<App />);

  expect(screen.getByTestId('name-filter')).toBeInTheDocument();

  expect(screen.getByTestId('button-filter')).toBeInTheDocument();

  userEvent.selectOptions(screen.getByTestId('column-filter'), ['orbital_period']);
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['menor que']);
  userEvent.type(screen.getByTestId('value-filter'), '200');
  userEvent.click(screen.getByTestId('button-filter'));

  userEvent.click(screen.getByTestId('button-remove-filters'));

});

it('Testando filtros', () => {
  render(<App />);

  expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('name-filter'), { target: { value: 'Naboo' } });
  expect(screen.getByTestId('name-filter')).toHaveDisplayValue('Naboo');
  
  expect(screen.getByTestId('column-filter')).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'diameter' } });
  expect(screen.getByTestId('column-filter')).toHaveDisplayValue('diameter');

});
