import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import HistoryList from '../components/dashboard/HistoryList';

export default function DashboardPage() {
  const [history, setHistory] = useState([]);

  // Get the current user's ID from localStorage (or auth context)
  const userId = localStorage.getItem('userId');

  const fetchHistory = async () => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get(`/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const handleDelete = async (id) => {
    if (!userId) return;
    try {
      await axiosInstance.delete(`/history/${userId}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchHistory();
    } catch (err) {
      console.error('Failed to delete history', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return <HistoryList history={history} onDelete={handleDelete} />;
}
