import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const config = {
  api: {
    bodyParser: false,
  },
};

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_ENDPOINT = process.env.R2_ENDPOINT!;

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const uploadImageToR2 = async (filePath: string, mimeType: string): Promise<string> => {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = `${randomUUID()}.${mimeType.split('/')[1]}`;
  const uploadCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: 'public-read',
  });

  await s3.send(uploadCommand);

  return `${R2_ENDPOINT}/${BUCKET_NAME}/${fileName}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    try {
      const image = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!image?.filepath || !image?.mimetype) {
        return res.status(400).json({ error: 'Invalid image upload' });
      }

      const imageUrl = await uploadImageToR2(image.filepath, image.mimetype);

      return res.status(200).json({ imageUrl });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Upload failed' });
    }
  });
}