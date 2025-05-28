import React, { useState } from 'react';
import {
  Card,
  TextField,
  Button,
  Typography,
  Avatar,
  InputAdornment,
  Snackbar,
  Alert,
  Fade,
} from '@mui/material';
import {
  Lock as LockIcon,
  AccountCircle,
  Email,
  PhoneAndroid,
  PersonAdd,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/apiService';
import loginImage from '../assets/login3.png';
import registerImage from '../assets/registration3.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Login states
  const [loginField, setLoginField] = useState('');
  const [password, setPassword] = useState('');

  // Register states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleLogin = async () => {
    if (!loginField || !password) return showSnackbar('All fields are required', 'warning');
    try {
      const res = await login({ loginField, password });
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('username', res.data.username);
      showSnackbar('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      showSnackbar(err.response?.data || 'Login failed', 'error');
    }
  };

    const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      type === 'login' ? handleLogin() : handleRegister();
    }
  };


  const handleRegister = async () => {
    if (!username || !email || !mobile || !regPassword) return showSnackbar('All fields are required', 'warning');
    try {
      await register({ username, email, mobile, password: regPassword });
      showSnackbar('Registration successful!');
      setIsLogin(true);
    } catch (err) {
      showSnackbar(err.response?.data || 'Registration failed', 'error');
    }
  };

  return (
    <div style={styles.wrapper}>
      <Fade in timeout={500}>
        <Card sx={styles.card}>
          <div style={styles.cardContainer}>
            {/* Left Side: Image */}
            <div style={styles.imageContainer}>
              <img
                src={isLogin ? loginImage : registerImage}
                alt="Auth"
                style={styles.image}
              />
            </div>

            {/* Right Side: Form */}
            <div style={styles.formContainer}>
              <Avatar sx={{ bgcolor: '#1976d2', margin: '0 auto' }}>
                {isLogin ? <LoginIcon /> : <PersonAdd />}
              </Avatar>
              <Typography variant="h5" align="center" mt={2}>
                {isLogin ? 'Login' : 'Register'}
              </Typography>

              {isLogin ? (
                <>
                  <TextField
                    label="Username / Email / Mobile"
                    fullWidth
                    margin="normal"
                    value={loginField}
                    onChange={(e) => setLoginField(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                    }}
                     onKeyDown={(e) => handleKeyPress(e, 'login')}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                    }}
                     onKeyDown={(e) => handleKeyPress(e, 'login')}
                  />
                  <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
                    Login
                  </Button>
                  <Button onClick={() => setIsLogin(false)} sx={{ mt: 1, color: '#1976d2' }}>
                    Don't have an account? Register
                  </Button>
                </>
              ) : (
                <>
                  <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     onKeyDown={(e) => handleKeyPress(e, 'register')}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }}
                  />
                  <TextField
                    label="Mobile"
                    fullWidth
                    margin="normal"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                     onKeyDown={(e) => handleKeyPress(e, 'register')}
                    InputProps={{ startAdornment: <InputAdornment position="start"><PhoneAndroid /></InputAdornment> }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                     onKeyDown={(e) => handleKeyPress(e, 'register')}
                    InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment> }}
                  />
                  <Button variant="contained" fullWidth onClick={handleRegister} sx={{ mt: 2 }}>
                    Register
                  </Button>
                  <Button onClick={() => setIsLogin(true)} sx={{ mt: 1, color: '#1976d2'  }}>
                    Already have an account? Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </Fade>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #0072ff, #00c6ff)',
  },
  card: {
    width: '900px',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  cardContainer: {
    display: 'flex',
    width: '100%',
  },
  imageContainer: {
    width: '50%',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '50%',
    height: '50%',
    objectFit: 'fill',
    padding: '8rem',
  },
  formContainer: {
    width: '50%',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
  },
};

export default AuthPage;
