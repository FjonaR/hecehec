import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Typography,
} from '@mui/material';
import { db, auth, googleProvider } from './services/firebase.js';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ padding: '20px' }}>
        {user ? (
          <>
            <Typography variant="h4">Hello, {user?.displayName}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              style={{ marginTop: '10px' }}
            >
              Log out
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
            style={{ marginTop: '10px' }}
          >
            Sign In with Google
          </Button>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
