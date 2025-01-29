import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatRelativeTime, getFirebaseDate } from '../utils/time';

const LogCard = ({ log, onRemove }) => {
  const speed = (log.distance / log.duration).toFixed(2);

  return (
    <Card style={{ width: '360px', position: 'relative' }}>
      <CardContent>
        {onRemove && (
          <IconButton
            style={{ position: 'absolute', bottom: '10px', right: '10px' }}
            onClick={() => onRemove(log.id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <Typography variant="body1" color="text.primary">
          You walked {log.distance} meters for {log.duration} minutes at {speed}{' '}
          meters/minute
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Completed {formatRelativeTime(getFirebaseDate(log.createdAt))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LogCard;
