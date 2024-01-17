import React, { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/api';
import { Planet, usePlanets } from '../Context/planetsContext';

function Table() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filterText, setFilterText] = useState('');
  const { numericFilters } = usePlanets();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlanets();
        const planetsWithoutResidents = data.map((planet: Planet) => {
          const { residents, ...planetWithoutResidents } = planet;
          return planetWithoutResidents;
        });
        setPlanets(planetsWithoutResidents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const applyFilter = (planet: Planet) => {
    return numericFilters.every((filter: any) => {
      const planetValue = Number(planet[filter.column]);
      switch (filter.comparison) {
        case 'maior que':
          return planetValue > filter.value;
        case 'menor que':
          return planetValue < filter.value;
        case 'igual a':
          return planetValue === filter.value;
        default:
          return true;
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredPlanets = planets.filter(
    (planet) => planet.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const filteredLocalPlanets = filteredPlanets.filter(applyFilter);

  return (
    <div>
      <input
        type="text"
        value={ filterText }
        onChange={ handleInputChange }
        data-testid="name-filter"
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocalPlanets.map((planet: Planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films.join(', ')}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
