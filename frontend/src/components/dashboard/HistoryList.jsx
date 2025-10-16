import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function HistoryList({ userId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    if (!userId) {
      console.warn("⚠️ No userId provided to HistoryList");
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        console.log("📡 Fetching history for user:", userId);
        const res = await axios.get(`${BASE_URL}/api/facedetect/history/${userId}`);
        console.log("✅ API Response:", res.data);
        setHistory(res.data);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this history item?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/facedetect/history/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("❌ Error deleting history item:", err);
      alert("Failed to delete item");
    }
  };

  if (loading)
    return <p className="text-center mt-4 text-gray-500">Loading history...</p>;

  if (error)
    return (
      <p className="text-center mt-4 text-red-500">
        Error loading history: {error}
      </p>
    );

  if (!history || history.length === 0)
    return <p className="text-center mt-4 text-gray-500">No history found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {history.map((item) => (
        <motion.div
          key={item._id}
          className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <img
              src={`${BASE_URL}${item.imageUrl}`}
              alt="Detected"
              className="w-full h-48 object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              {item.detectedCount} face{item.detectedCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="p-4">
            <p className="text-gray-700 text-sm mb-2">
              <strong>Detected:</strong> {item.detectedCount}
            </p>
            <p className="text-gray-500 text-xs mb-3">
              {new Date(item.createdAt).toLocaleString()}
            </p>

            <button
              onClick={() => handleDelete(item._id)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
