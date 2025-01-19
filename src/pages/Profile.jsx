import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase.js';

const Profile = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <p>Profile of {user.displayName}</p>
    </>
  );
};

export default Profile;
