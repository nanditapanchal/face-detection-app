import React, { useState } from 'react';
import ImageUploader from '../components/face/ImageUploader';
import WebcamCapture from '../components/face/WebcamCapture';
import ResultCanvas from '../components/face/ResultCanvas';
import axiosInstance from '../utils/axiosInstance';

export default function FaceDetectPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [boxes, setBoxes] = useState([]);

  const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await axiosInstance.post('/facedetect', formData);
  setImageUrl(URL.createObjectURL(file));
  setBoxes(res.data.boxes || []);
};

const handleCapture = async (base64) => {
  // Convert base64 to file
  const byteString = atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  const file = new File([blob], 'capture.jpg', { type: mimeString });

  const formData = new FormData();
  formData.append('image', file);

  const res = await axiosInstance.post('/facedetect', formData);
  setImageUrl(base64);
  setBoxes(res.data.boxes || []);
};


  return (
    <div className="text-center">
      <ImageUploader onUpload={handleImageUpload} />
      <WebcamCapture onCapture={handleCapture} />
      {imageUrl && <ResultCanvas imageUrl={imageUrl} boxes={boxes} />}
    </div>
  );
}
