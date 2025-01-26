import { useAuthState } from 'react-firebase-hooks/auth';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { auth } from './services/firebase.js';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Challenge from './pages/Challenge';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? '/dashboard' : '/login'} />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to={'/'} /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/challenge/:id"
            element={
              <PrivateRoute>
                <Challenge />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
