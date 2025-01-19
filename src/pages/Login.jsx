import { Button, Container, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

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
          <Typography variant="h4" gutterBottom>
            Welcome to hecehec 🚶
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </>
      )}
    </Container>
  );
};

export default Login;
