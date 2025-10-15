import { useState } from 'react';
import ImageUploader from '../components/face/ImageUploader';
import WebcamCapture from '../components/face/WebcamCapture';
import ResultCanvas from '../components/face/ResultCanvas';
import axiosInstance from '../utils/axiosInstance';

export default function FaceDetectPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file) => {
    if (!file) return;
    setLoading(true);

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG or PNG images allowed');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axiosInstance.post('/facedetect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(URL.createObjectURL(file));
      setBoxes(res.data.boxes || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Face detection failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = async (base64) => {
    setLoading(true);
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], 'capture.jpg', { type: mimeString });

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axiosInstance.post('/facedetect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(base64);
      setBoxes(res.data.boxes || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Face detection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Face Detection</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <ImageUploader onUpload={handleImageUpload} />
          <WebcamCapture onCapture={handleCapture} />
        </div>
        <div className="flex flex-col items-center">
          {loading && <p className="text-blue-600 font-semibold animate-pulse">Detecting faces...</p>}
          {imageUrl && <ResultCanvas imageUrl={imageUrl} boxes={boxes} />}
        </div>
      </div>
    </div>
  );
}
