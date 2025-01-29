export const formatDistance = (distance, distancePreference) => {
  if (distancePreference === 'km') {
    return `${(distance / 1000).toFixed(2)} km`;
  }
  return `${distance} meters`;
};
