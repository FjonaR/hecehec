import React, { useState } from 'react';
import { Fab, Modal, Box, TextField, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const initialChallenge = {
  name: '',
  distance: '',
  walkedDistance: 0,
  startedAt: '',
  endDate: '',
};

const CreateChallengeCard = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [challenge, setChallenge] = useState(initialChallenge);
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallenge((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!challenge.name) newErrors.name = 'Name is required';
    if (!challenge.distance || challenge.distance <= 0)
      newErrors.distance = 'Distance must be a positive number';
    if (!challenge.startedAt) newErrors.startedAt = 'Start date is required';
    if (!challenge.endDate) newErrors.endDate = 'End date is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onCreate(challenge);
      setChallenge(initialChallenge);
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
            Create New Challenge
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={challenge.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Distance (meters)"
            name="distance"
            type="number"
            fullWidth
            margin="normal"
            value={challenge.distance}
            onChange={handleChange}
            error={!!errors.distance}
            helperText={errors.distance}
          />
          <TextField
            label="Start Date"
            name="startedAt"
            type="date"
            fullWidth
            margin="normal"
            value={challenge.startedAt}
            onChange={handleChange}
            error={!!errors.startedAt}
            helperText={errors.startedAt}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            fullWidth
            margin="normal"
            value={challenge.endDate}
            onChange={handleChange}
            error={!!errors.endDate}
            helperText={errors.endDate}
            InputLabelProps={{
              shrink: true,
            }}
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

export default CreateChallengeCard;
