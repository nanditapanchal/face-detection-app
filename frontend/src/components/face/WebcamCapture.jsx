import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

export default function WebcamCapture({ onCapture }) {
  const webcamRef = useRef();
  const [captured, setCaptured] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
      setCaptured(true);
      setTimeout(() => setCaptured(false), 2000); // show captured feedback briefly
    }
  };

  return (
    <div className="my-6 flex flex-col items-center">
      {/* Webcam Container */}
      <div className="relative rounded-lg overflow-hidden shadow-lg border-4 border-gray-200 w-72 h-56 md:w-96 md:h-72">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
        />
        {captured && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center text-white font-bold text-lg animate-pulse">
            Captured!
          </div>
        )}
      </div>

      {/* Capture Button */}
      <button
        onClick={capture}
        className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
      >
        Capture
      </button>
    </div>
  );
}
