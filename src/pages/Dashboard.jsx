import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Button,
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
      <AppBar position="static">
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
      <div style={{ padding: '20px' }}>
        <Typography variant="h4">Hello, {user?.displayName}</Typography>
      </div>
    </>
  );
};

export default Dashboard;
