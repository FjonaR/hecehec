import {
  Card,
  CardContent,
  LinearProgress,
  Typography,
  Avatar,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { format } from 'date-fns';
import { KM_TO_M } from '../constants';

const ChallengeCard = ({
  title,
  start,
  end,
  distance,
  walkedDistance,
  createdAt,
  updatedAt,
  user,
}) => {
  const progress = (walkedDistance / distance) * 100;
  const leftDistance = (distance - walkedDistance) / KM_TO_M;

  return (
    <Card
      style={{
        margin: '20px',
        width: '400px',
        height: '250px',
        position: 'relative',
      }}
    >
      <CardContent>
        {user && (
          <Tooltip title={user.name}>
            <Avatar
              alt={user.name}
              src={user.picture}
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            />
          </Tooltip>
        )}
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
        <Typography variant="body2" color="text.secondary">
          Created At: {format(new Date(createdAt), 'PPpp')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated At: {format(new Date(updatedAt), 'PPpp')}
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
