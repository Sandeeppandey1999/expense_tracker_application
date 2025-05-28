import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Description,
  CalendarToday,
  MonetizationOn
} from '@mui/icons-material';
import { addTransaction } from '../services/apiService';

const categories = {
  EXPENSE: ['Food', 'Travel', 'Shopping', 'Rent', 'Utilities', 'Health'],
  INCOME: ['Salary', 'Freelance', 'Investments', 'Gift']
};

const Add = () => {
  const [form, setForm] = useState({
    type: 'EXPENSE',
    amount: '',
    category: '',
    description: '',
    date: ''
  });
  const [notify, setNotify] = useState({ open: false, type: 'success', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) {
      setNotify({ open: true, type: 'error', message: 'Please complete the all details' });

      return;
    } else {
      addTransaction(form);
      setNotify({ open: true, type: 'success', message: 'Transaction added successfully!' });
      setForm({ type: 'EXPENSE', amount: '', category: '', description: '', date: '' });
    }
  };

    const handleCloseSnackbar = () => {
    setNotify({ ...notify, open: false });
  };

  return (
    <Box display="flex" justifyContent="center" m={4}>
      <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
        <CardContent component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold" mb={4}>
            Add Transaction
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>

            <Grid item size={3}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  label="Type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <MenuItem value="EXPENSE">Expense</MenuItem>
                  <MenuItem value="INCOME">Income</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item size={9}>
              <TextField
                name="amount"
                label="Amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonetizationOn sx={{ color: '#1976d2' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Category and Description */}
            <Grid item size={3}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  value={form.category}
                  onChange={handleChange}
                  fullWidth
                >
                  {categories[form.type].map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item size={9}>
              <TextField
                name="description"
                label="Description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description sx={{ color: '#1976d2' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Date full width */}
            <Grid item size={3}>
              <TextField
                name="date"
                label="Date"
                type="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday sx={{ color: '#1976d2' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Submit button aligned right */}
            <Grid item size={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  // fullWidth
                  sx={{ borderRadius: 2, px: 4, py: 1.5 }}
                >
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
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
    </Box>
  );
};

export default Add;
