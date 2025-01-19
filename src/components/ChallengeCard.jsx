import { Card, CardContent, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { KM_TO_M } from '../constants';

const ChallengeCard = ({ title, start, end, distance, walkedDistance }) => {
  const progress = (walkedDistance / distance) * 100;
  const leftDistance = (distance - walkedDistance) / KM_TO_M;

  return (
    <Card style={{ margin: '20px', width: '400px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start: {start}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          End: {end}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Distance: {distance} meters
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Walked: {walkedDistance} meters
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Left: {leftDistance} km
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ marginTop: '10px' }}
        />
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
