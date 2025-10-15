import React, { useState, useEffect } from "react";
import axios from "axios";
import HistoryList from "../dashboard/HistoryList";

export default function ImageUploaderWithHistory({ userId }) {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const [history, setHistory] = useState([]);

  // Fetch existing history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/history/${userId}`);
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, [userId]);

  // Handle new file upload
  const handleUpload = async (file) => {
    setFileName(file.name);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      // Update history immediately
      setHistory((prev) => [res.data, ...prev]); // res.data should be the uploaded image object
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  // Handle deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="my-6 flex flex-col items-center">
      {/* Upload Button */}
      <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
        {fileName ? "Change Image" : "Choose Image"}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleUpload(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* Selected file preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 w-64 h-auto object-cover rounded-lg shadow-md"
        />
      )}

      {/* History Grid */}
      <HistoryList history={history} onDelete={handleDelete} />
    </div>
  );
}
