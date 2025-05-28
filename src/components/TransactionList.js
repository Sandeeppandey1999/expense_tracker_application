import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Box,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { deleteTransaction, fetchTransactions } from '../services/apiService';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [notify, setNotify] = useState({ open: false, message: '', type: 'success' });

  const loadTransactions = async () => {
    try{
    const res = await fetchTransactions();
    setTransactions(res.data||[]);
    }
    catch (error) {
      setNotify({ open: true, message: 'Failed to load transactions!', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setNotify({ open: true, message: 'Transaction deleted successfully!', type: 'success' });
      loadTransactions();
    } catch (error) {
      setNotify({ open: true, message: 'Failed to delete transaction!', type: 'error' });
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setNotify({ ...notify, open: false });
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Box m={4}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Transaction List
      </Typography>

      <Grid container spacing={3}>
        {transactions.map((t) => {
          const isIncome = t.type === 'INCOME';

          return (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <Card
                sx={{
                  backgroundColor: isIncome ? '#e8f5e9' : '#ffebee',
                  borderLeft: `6px solid ${isIncome ? '#43a047' : '#e53935'}`,
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="bold">
                      ₹{t.amount}
                    </Typography>
                    <Tooltip title="Delete Transaction">
                      <IconButton onClick={() => handleDelete(t.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    {isIncome ? (
                      <TrendingUpIcon color="success" />
                    ) : (
                      <TrendingDownIcon color="error" />
                    )}
                    <Typography variant="body1">{isIncome ? 'Income' : 'Expense'}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <CategoryIcon sx={{ color: '#1976d2' }} />
                    <Typography variant="body2">{t.category}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarMonthIcon sx={{ color: '#616161' }} />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(t.date).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Snackbar Notification */}
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

export default TransactionList;
