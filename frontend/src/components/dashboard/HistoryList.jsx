import React from 'react';
import { motion } from 'framer-motion';

export default function HistoryList({ history, onDelete }) {
  if (!history || history.length === 0) return <p className="text-center mt-4">No history found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-2">
      {history.map((item) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={`http://localhost:5000${item.imageUrl}`} // fixed field
            alt="Detected"
            className="w-full h-48 object-cover rounded"
          />
          <div className="mt-2 flex justify-between items-center">
            <p className="font-semibold">Faces: {item.detectedCount}</p> {/* fixed field */}
            <button
              onClick={() => onDelete(item._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Uploaded: {new Date(item.createdAt).toLocaleString()}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
