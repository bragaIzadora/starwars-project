import React, { useState } from 'react';
import { usePlanets, NumericFilter } from '../Context/planetsContext';

function NumericFilters() {
  const { setNumericFilters, numericFilters } = usePlanets();

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const columns = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];
  const usedColumns = numericFilters.map((filter) => filter.column);
  const availableColumns = columns.filter((col) => !usedColumns.includes(col));

  const handleFilter = () => {
    const Filter: NumericFilter = {
      column,
      comparison,
      value: Number(value),
    };

    setNumericFilters((Filters: NumericFilter[]) => [...Filters, Filter]);
    setColumn(availableColumns[0]); // reset column to first available column
  };

  const removeFilter = (index: number) => {
    setNumericFilters((Filters: NumericFilter[]) => Filters
      .filter((_, i) => i !== index));
  };

  const removeAllFilters = () => {
    setNumericFilters([]);
  };
  return (
    <div>
      {numericFilters.map((filter, index) => (
        <div data-testid="filter" key={ index }>
          <span>
            { filter.column }
            { filter.comparison }
            { filter.value }
          </span>
          <button onClick={ () => removeFilter(index) }>X</button>
        </div>
      ))}

      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <select
        data-testid="column-filter"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
      >
        {availableColumns.map((col) => (
          <option key={ col } value={ col }>{col}</option>
        ))}
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />

      <button
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>

      <button
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover filtragens
      </button>
    </div>
  );
}

export default NumericFilters;
