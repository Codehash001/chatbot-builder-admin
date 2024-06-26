import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { FaS } from 'react-icons/fa6';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const uploadFolder = 'data'

  if (!await fs.access(uploadFolder).then(() => true).catch(() => false)) {
    await fs.mkdir(uploadFolder, { recursive: true });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadDir = path.join(process.cwd(), uploadFolder);
  const filePath = path.join(uploadDir, file.name);

  try {
    await fs.writeFile(filePath, buffer);
    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
  }
}
