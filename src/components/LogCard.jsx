import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatRelativeTime } from '../utils/time';

const LogCard = ({ log, onRemove }) => {
  const speed = (log.distance / log.duration).toFixed(2);

  return (
    <Card style={{ margin: '20px', width: '400px', position: 'relative' }}>
      <CardContent>
        {onRemove && (
          <IconButton
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            onClick={() => onRemove(log.id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <Typography variant="body2" color="text.secondary">
          Distance: {log.distance} meters
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {log.duration} minutes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Speed: {speed} meters/minute
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatRelativeTime(
            new Date(
              log.createdAt.toDate ? log.createdAt.toDate() : log.createdAt
            )
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LogCard;
