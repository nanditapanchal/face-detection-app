import React from 'react';

export default function HistoryList({ history, onDelete }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Detection History</h2>
      <ul>
        {history.map((item) => (
          <li key={item.id} className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow">
            <span>{item.filename}</span>
            <div>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
