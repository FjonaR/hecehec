import {
  Card,
  CardContent,
  LinearProgress,
  Typography,
  Avatar,
  Tooltip,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { KM_TO_M } from '../constants';
import { useNavigate } from 'react-router-dom';

const ChallengeCard = ({
  id,
  title,
  distance,
  walkedDistance,
  createdAt,
  user,
  onRemove,
  currentUser,
  distancePreference,
  logs,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const progress = (walkedDistance / distance) * 100;
  const leftDistance = (distance - walkedDistance) / KM_TO_M;
  const totalMinutes =
    logs?.reduce((sum, log) => sum + Number(log.duration), 0) || 0;

  const formatDistance = (distance) => {
    if (distancePreference === 'km') {
      return `${(distance / 1000).toFixed(2)} km`;
    }
    return `${distance} meters`;
  };

  const handleClick = () => {
    navigate(`/challenge/${id}`);
  };

  const handleOpenDialog = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmRemove = () => {
    onRemove(id);
    setOpen(false);
  };

  return (
    <>
      <Card
        style={{
          margin: '20px',
          width: '100%',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              {user && (
                <Tooltip title={user.name}>
                  <Avatar alt={user.name} src={user.picture} />
                </Tooltip>
              )}
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              {leftDistance <= 0 ? (
                <Typography variant="h4">🎉</Typography>
              ) : (
                <Typography variant="h4">🚶</Typography>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {currentUser?.uid === user?.id && (
                <IconButton onClick={handleOpenDialog}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Distance: {formatDistance(distance)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Walked: {formatDistance(walkedDistance)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Left: {formatDistance(leftDistance * KM_TO_M)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created At: {format(new Date(createdAt), 'PPpp')}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ marginTop: '10px' }}>
            {!!leftDistance ? (
              <>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ flexGrow: 1, marginRight: '10px' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatDistance(leftDistance * KM_TO_M)} left
                </Typography>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Challenge completed in {totalMinutes} minutes
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Remove Challenge'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this challenge?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemove} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChallengeCard;
