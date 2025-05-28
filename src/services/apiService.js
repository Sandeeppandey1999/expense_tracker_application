// src/services/transactionService.js
import instance from '../api/axiosInstance';

export const fetchTransactions = () => instance.get('/transactions/list',{
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});
export const addTransaction = (data) => instance.post('/transactions/add', data,{
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});
export const deleteTransaction = (id) => instance.delete(`/transactions/delete/${id}`,{
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});
export const fetchStats = () => instance.get('/transactions/status',{
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});
export const login = (data) => instance.post('/login', data);
export const register = (data) => instance.post('/register', data);

export const fetchUser = () => instance.get('/profile', {
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});
export const updateUser = (data) => instance.put('/profileUpdate', data, {
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});
