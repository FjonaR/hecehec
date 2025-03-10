import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase.js';
import { useDistancePreference } from '../states/distancePreference.jsx';

const Profile = () => {
  const [user] = useAuthState(auth);
  const [distancePreference, setDistancePreference] = useDistancePreference();

  const handleChange = async (event) => {
    const newPreference = event.target.value;
    setDistancePreference(newPreference);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile of {user.displayName}
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Distance Preference</InputLabel>
        <Select
          value={distancePreference}
          onChange={handleChange}
          label="Distance Preference"
        >
          <MenuItem value="meters">Meters</MenuItem>
          <MenuItem value="km">Kilometers</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};

export default Profile;
