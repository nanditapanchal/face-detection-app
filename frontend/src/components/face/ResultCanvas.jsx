import React from 'react';

export default function ResultCanvas({ imageUrl, boxes }) {
  return (
    <div className="relative inline-block">
      <img src={imageUrl} alt="result" className="rounded shadow" />
      {boxes.map((box, idx) => (
        <div
          key={idx}
          className="absolute border-2 border-red-500"
          style={{
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
          }}
        ></div>
      ))}
    </div>
  );
}
