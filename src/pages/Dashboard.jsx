import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Container,
  Box,
} from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase.js';

const Dashboard = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {user && (
            <>
              <Avatar alt={user.displayName} src={user.photoURL} />
              <Button color="inherit" onClick={handleLogout}>
                Log out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This is to offset the content below the AppBar */}
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
          width="100%"
        >
          <Typography variant="h4">Hello, {user?.displayName}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
