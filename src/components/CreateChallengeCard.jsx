import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const initialChallenge = {
  name: '',
  start: '',
  end: '',
  distance: '',
  walkedDistance: 0,
};

const CreateChallengeCard = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [challenge, setChallenge] = useState(initialChallenge);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallenge((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onCreate(challenge);
    setChallenge(initialChallenge);
    handleClose();
  };

  return (
    <>
      <Card
        style={{
          margin: '20px',
          width: '400px',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleOpen}
      >
        <CardContent style={{ textAlign: 'center' }}>
          <AddIcon style={{ fontSize: '4rem' }} />
          <Typography variant="h6" component="div">
            Create New Challenge
          </Typography>
        </CardContent>
      </Card>
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
          />
          <TextField
            label="Start"
            name="start"
            fullWidth
            margin="normal"
            value={challenge.start}
            onChange={handleChange}
          />
          <TextField
            label="End"
            name="end"
            fullWidth
            margin="normal"
            value={challenge.end}
            onChange={handleChange}
          />
          <TextField
            label="Distance (meters)"
            name="distance"
            type="number"
            fullWidth
            margin="normal"
            value={challenge.distance}
            onChange={handleChange}
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
