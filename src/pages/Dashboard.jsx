import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Container,
  Box,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase.js';
import ChallengeCard from '../components/ChallengeCard';
import CreateChallengeCard from '../components/CreateChallengeCard';

const initialChallenges = [
  {
    name: `Let's walk to Hamburg from Berlin`,
    start: 'Berlin',
    end: 'Hamburg',
    distance: 289000,
    walkedDistance: 50000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    name: 'Walk around the equator',
    start: 'Quito',
    end: 'Quito',
    distance: 40075000,
    walkedDistance: 15000000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
];

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState(initialChallenges);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  const handleAcceptChallenge = () => {
    console.log('Challenge accepted!');
  };

  const handleCreateChallenge = (newChallenge) => {
    const timestamp = new Date().toISOString();
    setChallenges((prev) => [
      ...prev,
      {
        ...newChallenge,
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
    ]);
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
      </AppBar>
      <Toolbar /> {/* This is to offset the content below the AppBar */}
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Box
          display="flex"
          height="80vh"
          width="100%"
          flexDirection="row"
          flexWrap="wrap"
          gap={'16px'}
        >
          <CreateChallengeCard onCreate={handleCreateChallenge} />
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={index}
              title={challenge.name}
              start={challenge.start}
              end={challenge.end}
              distance={challenge.distance}
              walkedDistance={challenge.walkedDistance}
              createdAt={challenge.createdAt}
              updatedAt={challenge.updatedAt}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
