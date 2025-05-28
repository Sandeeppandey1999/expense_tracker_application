import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
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
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
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
    <Container maxWidth="sm">
      <Typography variant="h4" mt={4} gutterBottom>
        My Profile
      </Typography>

      {['username', 'email', 'mobile'].map((field) => (
        <TextField
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          name={field}
          fullWidth
          disabled={field === 'username'}
          margin="normal"
          value={user[field] || ''}
          onChange={handleChange}
        />
      ))}

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>

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
