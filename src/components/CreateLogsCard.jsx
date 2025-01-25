import React, { useState } from 'react';
import { Fab, Modal, Box, TextField, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const initialLog = {
  distance: '',
  duration: '',
};

const CreateLogsCard = ({ onCreate, challengeDistance, walkedDistance }) => {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState(initialLog);
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const leftDistance = challengeDistance - walkedDistance;
    if (!log.distance || log.distance <= 0)
      newErrors.distance = 'Distance must be a positive number';
    if (log.distance > leftDistance)
      newErrors.distance =
        'Distance cannot be greater than remaining challenge distance';
    if (!log.duration || log.duration <= 0)
      newErrors.duration = 'Duration must be a positive number';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onCreate(log);
      setLog(initialLog);
      handleClose();
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
      >
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'black',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create New Log
          </Typography>
          <TextField
            label="Distance (meters)"
            name="distance"
            type="number"
            fullWidth
            margin="normal"
            value={log.distance}
            onChange={handleChange}
            error={!!errors.distance}
            helperText={errors.distance}
          />
          <TextField
            label="Duration (minutes)"
            name="duration"
            type="number"
            fullWidth
            margin="normal"
            value={log.duration}
            onChange={handleChange}
            error={!!errors.duration}
            helperText={errors.duration}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateLogsCard;
