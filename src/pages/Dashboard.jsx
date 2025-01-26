import { Box, Container } from '@mui/material';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChallengeCard from '../components/ChallengeCard';
import CreateChallengeCard from '../components/CreateChallengeCard';
import { auth, db } from '../services/firebase.js';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [challenges, setChallenges] = useState([]);
  const [distancePreference, setDistancePreference] = useState(
    localStorage.getItem('distancePreference') ?? 'meters'
  );

  useEffect(() => {
    const fetchChallenges = async () => {
      const querySnapshot = await getDocs(collection(db, 'challenges'));
      const challengesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const walkedDistance =
          data.logs?.reduce((sum, log) => sum + Number(log.distance), 0) || 0;
        return {
          id: doc.id,
          ...data,
          walkedDistance,
          createdAt: data.createdAt.toDate(),
          deletedAt: data.deletedAt?.toDate(),
        };
      });
      setChallenges(challengesData);
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    const fetchUserPreference = async () => {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setDistancePreference(userSnap.data().distancePreference || 'meters');
      }
    };

    if (user) {
      fetchUserPreference();
    }
  }, [user]);

  const handleCreateChallenge = async (newChallenge) => {
    const timestamp = new Date();
    const docRef = await addDoc(collection(db, 'challenges'), {
      ...newChallenge,
      createdAt: timestamp,
      deletedAt: null,
      user: {
        id: user.uid,
        name: user.displayName,
        picture: user.photoURL,
      },
    });
    setChallenges((prev) => [
      ...prev,
      {
        id: docRef.id,
        ...newChallenge,
        createdAt: timestamp,
        deletedAt: null,
        user: {
          id: user.uid,
          name: user.displayName,
          picture: user.photoURL,
        },
      },
    ]);
  };

  const handleRemoveChallenge = async (challengeId) => {
    const challengeRef = doc(db, 'challenges', challengeId);
    await deleteDoc(challengeRef);
    setChallenges((prev) =>
      prev.filter((challenge) => challenge.id !== challengeId)
    );
  };

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Box display="flex" width="100%" flexDirection="row" flexWrap="wrap">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              title={challenge.name}
              distance={challenge.distance}
              walkedDistance={challenge.walkedDistance}
              createdAt={
                challenge.createdAt.toDate
                  ? challenge.createdAt.toDate()
                  : challenge.createdAt
              }
              user={challenge.user}
              logs={challenge.logs}
              onRemove={handleRemoveChallenge}
              currentUser={user}
              distancePreference={distancePreference}
            />
          ))}
        </Box>
      </Container>
      <CreateChallengeCard onCreate={handleCreateChallenge} />
    </>
  );
};

export default Dashboard;
