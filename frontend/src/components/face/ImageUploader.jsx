import React from 'react';

export default function ImageUploader({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="my-4">
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
}
