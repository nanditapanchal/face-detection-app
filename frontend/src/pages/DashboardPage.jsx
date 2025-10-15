import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import HistoryList from '../components/dashboard/HistoryList';

export default function DashboardPage() {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchHistory = async () => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get(`/history/${userId}`);
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const handleDelete = async (id) => {
    if (!userId) return;
    try {
      await axiosInstance.delete(`/history/${userId}/${id}`);
      fetchHistory();
    } catch (err) {
      console.error('Failed to delete history', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Detection History</h2>
      <HistoryList history={history} onDelete={handleDelete} />
    </div>
  );
}
