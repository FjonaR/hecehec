import { useAuthState } from 'react-firebase-hooks/auth';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { auth } from './services/firebase.js';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [user] = useAuthState(auth);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router basename="/hecehec">
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to={'/'} /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={user ? '/dashboard' : '/login'} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
