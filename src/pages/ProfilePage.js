import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Card,
  CardContent,
  InputAdornment,
  Stack,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import { fetchUser, updateUser } from '../services/apiService';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({ open: false, type: 'success', message: '' });

  const fetchUserInfo = async () => {
    try {
      const res = await fetchUser();
      setUser(res.data);
    } catch (err) {
      setNotify({ open: true, type: 'error', message: 'Failed to fetch profile.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { username, email, mobile } = user;
    if (!username || !email || !mobile) {
      setNotify({ open: true, type: 'error', message: 'All fields are required.' });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setNotify({ open: true, type: 'error', message: 'Invalid email format.' });
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setNotify({ open: true, type: 'error', message: 'Mobile number must be 10 digits.' });
      return;
    }
    try {
      await updateUser(user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      setNotify({ open: true, type: 'success', message: 'Profile updated successfully!' });
    } catch (err) {
      setNotify({ open: true, type: 'error', message: 'Failed to update profile.' });
    }
  };

  const handleCloseSnackbar = () => {
    setNotify({ ...notify, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" fontWeight="bold" color="primary">
            My Profile
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              disabled
              value={user.username || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              value={user.email || ''}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mobile"
              name="mobile"
              fullWidth
              value={user.mobile || ''}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Box mt={4} textAlign="center">
            <Button variant="contained" color="primary" size="large" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={notify.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={notify.type} sx={{ width: '100%' }}>
          {notify.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
