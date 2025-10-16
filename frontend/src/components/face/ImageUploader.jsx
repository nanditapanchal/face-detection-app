import React, { useState } from "react";

export default function ImageUploader({ onUpload }) {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onUpload(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-6 flex flex-col items-center">
      {/* Styled Upload Button */}
      <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
        {fileName ? "Change Image" : "Choose Image"}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* Display selected file name */}
      {fileName && (
        <p className="mt-3 text-gray-700 text-sm animate-fadeIn">
          Selected File: <span className="font-semibold">{fileName}</span>
        </p>
      )}

      {/* Image preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 w-64 h-auto rounded-lg shadow-md object-cover"
        />
      )}
    </div>
  );
}
