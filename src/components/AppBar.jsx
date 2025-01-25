import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase.js';

const AppBar = ({ children }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
  };

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={handleDashboardClick}
          >
            Dashboard
          </Typography>
          {user && (
            <>
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                style={{ marginRight: '10px' }}
                onClick={handleAvatarClick}
              />
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
              >
                Log out
              </Button>
            </>
          )}
        </Toolbar>
      </MuiAppBar>
      <Toolbar /> {/* This is to offset the content below the AppBar */}
      {children}
    </>
  );
};

export default AppBar;
