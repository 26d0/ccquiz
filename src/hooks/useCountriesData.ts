import { useState, useEffect } from 'react';
import type { CountryData } from '@/types';

export const useCountriesData = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/country_cctld.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n');
        const parsedData: CountryData[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            const [ccTLD, countryEN, countryJP] = line.split(',');
            parsedData.push({
              ccTLD: ccTLD.trim(),
              countryEN: countryEN.trim(),
              countryJP: countryJP.trim()
            });
          }
        }
        
        setCountries(parsedData);
        setError(null);
      } catch (err) {
        console.error('Error loading CSV:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { countries, loading, error };
};
