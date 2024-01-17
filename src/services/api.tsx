const API_URL = 'https://swapi.dev/api/planets';

async function fetchPlanets() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw error;
  }
}

export { fetchPlanets };
