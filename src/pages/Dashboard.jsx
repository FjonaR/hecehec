import { Box, Container } from '@mui/material';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChallengeCard from '../components/ChallengeCard';
import CreateCustomChallengeCard from '../components/CreateChallengeCard.jsx';
import Podium from '../components/Podium';
import { auth, db } from '../services/firebase.js';
import { useDistancePreference } from '../states/distancePreference.jsx';
import { formatDistance } from '../utils/distance';
import { getFirebaseDate } from '../utils/time.js';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [challenges, setChallenges] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [distancePreference] = useDistancePreference();

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
          startedAt: data.startedAt?.toDate(),
          endedAt: data.endedAt?.toDate(),
          deletedAt: data.deletedAt?.toDate(),
        };
      });
      setChallenges(challengesData);
      fetchTopUsers(challengesData);
    };

    const fetchTopUsers = (challengesData) => {
      const userSteps = {};

      challengesData.forEach((challenge) => {
        challenge.logs?.forEach((log) => {
          const userId = challenge.user.id;
          if (!userSteps[userId]) {
            userSteps[userId] = {
              name: challenge?.user?.name.split(' ')[0] || 'Unknown',
              picture: challenge.user?.picture || '',
              score: 0,
            };
          }
          userSteps[userId].score += Number(log.distance);
        });
      });

      const sortedUsers = Object.values(userSteps)
        .sort((a, b) => b.score - a.score)
        .map((user) => ({
          ...user,
          score: formatDistance(user.score, distancePreference),
        }));
      setTopUsers(sortedUsers.slice(0, 3));
    };

    fetchChallenges();
  }, []);

  const handleCreateChallenge = async (newChallenge) => {
    const timestamp = new Date();
    const docRef = await addDoc(collection(db, 'challenges'), {
      ...newChallenge,
      createdAt: timestamp,
      updatedAt: timestamp,
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
        updatedAt: timestamp,
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
        <Podium topUsers={topUsers} />
        <Box display="flex" width="100%" flexDirection="row" flexWrap="wrap">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              title={challenge.name}
              distance={challenge.distance}
              walkedDistance={challenge.walkedDistance}
              createdAt={getFirebaseDate(challenge.createdAt)}
              updatedAt={getFirebaseDate(challenge.updatedAt)}
              startedAt={getFirebaseDate(challenge.startedAt)}
              endedAt={getFirebaseDate(challenge.endedAt)}
              user={challenge.user}
              logs={challenge.logs}
              onRemove={handleRemoveChallenge}
              currentUser={user}
              distancePreference={distancePreference}
            />
          ))}
        </Box>
      </Container>
      <CreateCustomChallengeCard onCreate={handleCreateChallenge} />
    </>
  );
};

export default Dashboard;
