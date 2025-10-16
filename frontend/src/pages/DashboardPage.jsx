import React from "react";
import { useAuth } from "../context/AuthContext";
import HistoryList from "../components/dashboard/HistoryList";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Dashboard
      </h1>

      {user ? (
        <HistoryList userId={user._id} />
      ) : (
        <p className="text-center text-gray-500 mt-4">
          Please login to see your history.
        </p>
      )}
    </div>
  );
}
