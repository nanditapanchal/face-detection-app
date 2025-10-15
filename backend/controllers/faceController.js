import History from '../models/History.js';
import path from 'path';
import fs from 'fs';
import detectOpenCV from '../utils/detect_opencv.js';
import axios from 'axios';

export async function handleFaceDetect(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image' });
    const imagePath = req.file.path; // local path
    // Option A: Node detection using detectOpenCV
    let boxes = await detectOpenCV(imagePath); // returns [{x,y,width,height,confidence}, ...]
    

    // Save history
    const url = `/uploads/${path.basename(imagePath)}`; // served by express static
    const hist = await History.create({
      userId: req.user._id,
      imageUrl: url,
      detectedCount: boxes.length,
      boxes
    });

    res.json({ imageUrl: url, detectedCount: boxes.length, boxes, historyId: hist._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Detection failed', error: err.message });
  }
}
export async function getHistory(req, res) {
  try {
    const { userId } = req.params;
    if (userId !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    const history = await History.find({ userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}
// import History from '../models/History.js';
// import path from 'path';
// import fs from 'fs';

// export async function handleFaceDetect(req, res) {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No image' });

//     const imagePath = req.file.path; // local path

//     // ✅ Dummy face detection (replace detectOpenCV with static boxes)
//     const boxes = [
//       { x: 50, y: 50, width: 100, height: 100, confidence: 0.9 },
//       { x: 200, y: 80, width: 80, height: 80, confidence: 0.85 }
//     ];

//     // Save history
//     const url = `/uploads/${path.basename(imagePath)}`; // served by express static
//     const hist = await History.create({
//       userId: req.user._id,
//       imageUrl: url,
//       detectedCount: boxes.length,
//       boxes
//     });

//     res.json({ imageUrl: url, detectedCount: boxes.length, boxes, historyId: hist._id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Detection failed', error: err.message });
//   }
// }

// export async function getHistory(req, res) {
//   try {
//     const { userId } = req.params;
//     if (userId !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
//     const history = await History.find({ userId }).sort({ createdAt: -1 });
//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// }
