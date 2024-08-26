import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import formidable, { File } from 'formidable';
import path from 'path';

const prisma = new PrismaClient();

// This tells Next.js to disable its default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } else if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), '/public/uploads'), // Directory for file uploads
      keepExtensions: true, // Keep file extensions
      maxFileSize: 10 * 1024 * 1024, // 10MB file size limit
    });

    let fields;
    let files;

    try {
      [fields, files] = await form.parse(req);

      const { title, genre, releaseDate, rating } = fields;
      const posterFile = files.posterFile as File | File[];

      if (!posterFile || (Array.isArray(posterFile) && posterFile.length === 0)) {
        res.status(400).json({ message: 'Poster file is required' });
        return;
      }

      const filePath = Array.isArray(posterFile) ? posterFile[0].filepath : posterFile.filepath;

      const posterUrl = `/uploads/${path.basename(filePath)}`;
      
      try {
        const newMovie = await prisma.movie.create({
          data: {
            title: title[0] as string,
            genre: genre[0] as string,
            releaseDate: new Date(releaseDate as string),
            rating: parseFloat(rating as string),
            posterUrl: posterUrl,
          },
        });
        res.status(201).json(newMovie);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to save movie' });
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'File upload failed' });
      return;
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
