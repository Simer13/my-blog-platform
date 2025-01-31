import { v2 as cloudinary } from 'cloudinary';
import multiparty from 'multiparty';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Required for handling file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Parse form data using a Promise
    const { files } = await new Promise((resolve, reject) => {
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Check if file exists
    if (!files?.file?.[0]?.path) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = files.file[0].path;

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // Ensure this is set in env
    });

    // Delete temporary file after upload
    await fs.promises.unlink(filePath);

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
}
