import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import AppBar from './AppBar';
import { auth } from '../services/firebase';

const PrivateRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  return user ? <AppBar>{children}</AppBar> : <Navigate to="/login" />;
};

export default PrivateRoute;
