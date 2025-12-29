const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5t-fflash' });

const upload = multer({ dest: 'uploads/' });

const PORT = 3000;

// Fungsi contoh mengubah file gambar jadi format yang bisa diterima model generatif
function imageToGenerativePart(imagePath) {
  const buffer = fs.readFileSync(imagePath);
  const base64Image = buffer.toString('base64');
  return {
    inlineData: { data: base64Image, mimeType: 'image/jpeg' }, // sesuaikan mimeType jika perlu
  };
}

app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const result = await model.generateContent({ prompt });
    // Asumsi result sudah berisi properti text
    res.json({ output: result.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/generate-from-image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  const prompt = req.body.prompt || 'Describe the image';
  const imagePart = imageToGenerativePart(req.file.path);

  try {
    // Kirim objek dengan prompt dan image part, asumsi model bisa menerima array ini
    const result = await model.generateContent([prompt, imagePart]);
    res.json({ output: result.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

app.post('/generate-from-document', upload.single('document'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Document file is required' });
  }

  const filePath = req.file.path;

  try {
    const buffer = fs.readFileSync(filePath);
    const base64data = buffer.toString('base64');
    const mimetype = req.file.mimetype;

    const documentPart = {
      inlineData: { data: base64data, mimeType: mimetype },
    };

    const result = await model.generateContent(['Analyze the document', documentPart]);
    res.json({ output: result.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(filePath);
  }
});

app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Audio file is required' });
  }

  const filePath = req.file.path;

  try {
    const audioBuffer = fs.readFileSync(filePath);
    const base64audio = audioBuffer.toString('base64');
    const audioPart = {
      inlineData: { audio: { data: base64audio, mimeType: req.file.mimetype } },
    };

    const result = await model.generateContent(['Transcribe or analyze the audio', audioPart]);
    res.json({ output: result.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(filePath);
  }
});

app.listen(PORT, () => {
  console.log(`Gemini API server is running at http://localhost:${PORT}`);
});
