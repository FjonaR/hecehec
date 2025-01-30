import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import googleIcon from '../assets/google.svg'; // Import the Google icon
import { auth, googleProvider } from '../services/firebase.js';

const Login = () => {
  const [loading] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '20%' }}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTFpZzBmMDV5Mzg0YWJob2Ewb3YzYXN4eDdkcXgwazV3MjlpdWh3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hkTXRkfarShjLBQH0v/giphy.gif"
            alt="hec e hec"
            style={{ width: '100px', heigh: '100px', marginBottom: '20px' }}
          />
          <Typography variant="h4" gutterBottom>
            hec e hec
          </Typography>
          <Button
            variant="outlined"
            color="transparent" // Set button color to white
            onClick={signInWithGoogle}
            startIcon={
              <img
                src={googleIcon}
                alt="Google"
                style={{ width: 24, height: 24 }}
              />
            } // Use Google icon
          >
            Sign In with Google
          </Button>
        </>
      )}
    </Container>
  );
};

export default Login;
