import express from 'express';
import multer from 'multer';
import path from 'path';
import auth from '../middleware/authMiddleware.js';
import { handleFaceDetect, getHistory } from '../controllers/faceController.js';

const router = express.Router();
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/facedetect', auth, upload.single('image'), handleFaceDetect);
router.get('/history/:userId', auth, getHistory);

export default router;
