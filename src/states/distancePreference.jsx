import { useState, useEffect } from 'react';

export const useDistancePreference = () => {
  const [distancePreference, setDistancePreference] = useState(
    localStorage.getItem('distancePreference') ?? 'meters'
  );

  useEffect(() => {
    localStorage.setItem('distancePreference', distancePreference);
  }, [distancePreference]);

  return [distancePreference, setDistancePreference];
};
