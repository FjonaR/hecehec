import {
  Avatar,
  Box,
  Button,
  Container,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import CreateLogsCard from '../components/CreateLogsCard';
import LoadingScreen from '../components/LoadingScreen';
import LogCard from '../components/LogCard';
import { KM_TO_M } from '../constants';
import { auth, db } from '../services/firebase';
import { formatDistance } from '../utils/distance';
import { formatRelativeTime, getFirebaseDate } from '../utils/time';

const Challenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [distancePreference] = useState(
    localStorage.getItem('distancePreference') ?? 'meters'
  );

  useEffect(() => {
    const fetchChallenge = async () => {
      const docRef = doc(db, 'challenges', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setChallenge({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };

    fetchChallenge();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!challenge) {
    return (
      <Container>
        <Typography variant="h4" component="div" gutterBottom>
          Challenge Not Found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  const walkedDistance =
    challenge.logs?.reduce((sum, log) => sum + Number(log.distance), 0) || 0;
  const progress = (walkedDistance / challenge.distance) * 100;
  const leftDistance = (challenge.distance - walkedDistance) / KM_TO_M;

  const handleCreateLog = async (newLog) => {
    const timestamp = new Date();
    const logWithTimestamp = {
      ...newLog,
      createdAt: timestamp,
      id: `${timestamp.getTime()}-${Math.random()}`, // Ensure unique key
    };
    const challengeRef = doc(db, 'challenges', id);
    await updateDoc(challengeRef, {
      logs: arrayUnion(logWithTimestamp),
      updatedAt: timestamp,
    });
    setChallenge((prev) => ({
      ...prev,
      logs: [...(prev.logs || []), logWithTimestamp],
    }));
  };

  const handleRemoveLog = async (logId) => {
    const logToRemove = challenge.logs.find((log) => log.id === logId);
    const challengeRef = doc(db, 'challenges', id);
    await updateDoc(challengeRef, {
      logs: arrayRemove(logToRemove),
    });
    setChallenge((prev) => ({
      ...prev,
      logs: prev.logs.filter((log) => log.id !== logId),
    }));
  };

  const sortedLogs = [...(challenge.logs || [])].sort((a, b) => {
    return getFirebaseDate(b.createdAt) - getFirebaseDate(a.createdAt);
  });

  const totalMinutes =
    challenge.logs?.reduce((sum, log) => sum + Number(log.duration), 0) || 0;

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Box display="flex" alignItems="center" gap="10px" marginBottom="10px">
        {challenge.user && (
          <Tooltip title={challenge.user.name}>
            <Avatar alt={challenge.user.name} src={challenge.user.picture} />
          </Tooltip>
        )}
        <Box>
          <Typography variant="h5" component="div">
            {challenge.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Updated {formatRelativeTime(new Date(challenge.updatedAt.toDate()))}
          </Typography>
        </Box>
        {leftDistance <= 0 && <Typography variant="h4">🎉</Typography>}
      </Box>
      <Typography variant="body2" color="text.secondary">
        Walked {formatDistance(walkedDistance, distancePreference)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Left {leftDistance} km
      </Typography>
      {/* <Typography variant="body2" color="text.secondary">
        Created At: {formatRelativeTime(new Date(challenge.createdAt.toDate()))}
      </Typography> */}

      <Box display="flex" alignItems="center" sx={{ marginTop: '10px' }}>
        {!!leftDistance ? (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ flexGrow: 1, marginRight: '10px' }}
            />
            <Typography variant="body2" color="text.secondary">
              {leftDistance.toFixed(2)} km left
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Challenge completed in {totalMinutes} minutes
          </Typography>
        )}
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        gap="8px"
        marginTop="20px"
        marginBottom="80px"
        flexWrap="wrap"
      >
        {sortedLogs.map((log) => (
          <LogCard
            key={log.id}
            log={log}
            onRemove={user?.uid === challenge.user.id ? handleRemoveLog : null}
          />
        ))}
      </Box>
      {leftDistance > 0 && user?.uid === challenge.user.id && (
        <CreateLogsCard
          onCreate={handleCreateLog}
          challengeDistance={challenge.distance}
          walkedDistance={walkedDistance}
        />
      )}
    </Container>
  );
};

export default Challenge;
