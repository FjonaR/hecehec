import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../services/firebase.js';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const [user] = useAuthState(auth);
  const [distancePreference, setDistancePreference] = useState('meters');

  const handleChange = async (event) => {
    const newPreference = event.target.value;
    setDistancePreference(newPreference);
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      distancePreference: newPreference,
    });
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
