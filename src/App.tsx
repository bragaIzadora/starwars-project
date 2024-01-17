import './App.css';
import Table from './components/table';
import { PlanetsProvider } from './Context/planetsContext';
import NumericFilters from './components/starwarsNumericFilters';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <NumericFilters />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
