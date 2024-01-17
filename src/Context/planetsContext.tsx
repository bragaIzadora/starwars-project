import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Planet {
  [key: string]: string | string[];
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
  residents: string[];
}

export interface NumericFilter {
  column: string;
  comparison: string;
  value: number;
}

interface ContextData {
  numericFilters: NumericFilter[];
  setNumericFilters: React.Dispatch<React.SetStateAction<NumericFilter[]>>;
}

const PlanetsContext = createContext<ContextData | undefined>(undefined);
export const usePlanets = () => {
  const context = useContext(PlanetsContext);
  if (context === undefined) {
    throw new Error('usePlanetsContext must be used within a PlanetsProvider');
  }
  return context;
};

  type PProviderProps = { children: ReactNode; };

export function PlanetsProvider({ children }: PProviderProps) {
  const [numericFilters, setNumericFilters] = useState<NumericFilter[]>([]);

  return (
    <PlanetsContext.Provider
      value={ {
        numericFilters,
        setNumericFilters,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}
