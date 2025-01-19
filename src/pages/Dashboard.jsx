import React, { useState, useEffect } from 'react';
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
import { auth, db } from '../services/firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import ChallengeCard from '../components/ChallengeCard';
import CreateChallengeCard from '../components/CreateChallengeCard';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const querySnapshot = await getDocs(collection(db, 'challenges'));
      const challengesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
        deletedAt: doc.data().deletedAt?.toDate(),
      }));
      setChallenges(challengesData);
    };

    fetchChallenges();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  const handleCreateChallenge = async (newChallenge) => {
    const timestamp = serverTimestamp();
    const docRef = await addDoc(collection(db, 'challenges'), {
      ...newChallenge,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
    });
    setChallenges((prev) => [
      ...prev,
      {
        id: docRef.id,
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
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
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
