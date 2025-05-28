// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import ExpenseLineChart from '../components/Charts/ExpenseLineChart';
import ExpensePieChart from '../components/Charts/ExpensePieChart';
import axios from 'axios';
import { fetchTransactions } from '../services/apiService';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [notify, setNotify] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetchTransactions();
        setTransactions(res.data || []);
        setNotify({
          open: true,
          message: 'Dashboard data loaded successfully!',
          type: 'success'
        });
      } catch (err) {
        setNotify({
          open: true,
          message: 'Failed to load data!',
          type: 'error'
        });
      }
    };
    fetchStats();
  }, []);

  const handleCloseSnackbar = () => {
    setNotify({ ...notify, open: false });
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;


  return (
    <Container>
      <Grid container spacing={3} mb={3}>
        <Grid item size={4}>
          <Card sx={{ backgroundColor: '#e6ffed', boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">Total Income</Typography>
              <Typography variant="h5" color="#00c853">₹{totalIncome}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item size={4}>
          <Card sx={{ backgroundColor: '#ffe6e6', boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">Total Expense</Typography>
              <Typography variant="h5" color="#d32f2f">₹{totalExpense}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item size={4}>
          <Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">Total Balance</Typography>
              <Typography variant="h5" color="#1976d2">₹{balance}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item size={6}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Daily Income vs Expense</Typography>
              <ExpenseLineChart data={transactions} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item size={6}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Expense Distribution</Typography>
              <ExpensePieChart data={transactions} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Box>
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
    </Container>
  );
};

export default Dashboard;
