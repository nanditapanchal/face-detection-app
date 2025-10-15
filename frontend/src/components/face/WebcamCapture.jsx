import React, { useRef } from 'react';
import Webcam from 'react-webcam';

export default function WebcamCapture({ onCapture }) {
  const webcamRef = useRef();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="my-4 flex flex-col items-center">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded shadow" />
      <button onClick={capture} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Capture</button>
    </div>
  );
}
