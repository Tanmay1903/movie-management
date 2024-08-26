import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import formidable, { File } from 'formidable';
import path from 'path';
import { promises as fs } from 'fs';

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    const movie = await prisma.movie.findUnique({ where: { id: Number(id) } })
    res.status(200).json(movie)
  } else if (req.method === 'PUT') {
    
    const form = formidable({
      uploadDir: path.join(process.cwd(), '/public/uploads'), // Directory for file uploads
      keepExtensions: true, // Keep file extensions
      maxFileSize: 10 * 1024 * 1024, // 10MB file size limit
    });

    let fields;
    let files;

    try {
      [fields, files] = await form.parse(req);

      let { title, genre, releaseDate, rating, posterUrl } = fields;
      if (!posterUrl) {
        const posterFile = files.posterFile as File | File[];

        if (!posterFile || (Array.isArray(posterFile) && posterFile.length === 0)) {
          res.status(400).json({ message: 'Poster file is required' });
          return;
        }

        const filePath = Array.isArray(posterFile) ? posterFile[0].filepath : posterFile.filepath;

        posterUrl = `/uploads/${path.basename(filePath)}`;
      }
      const updatedMovie = await prisma.movie.update({
        where: { id: Number(id) },
        data: { title: title[0], genre: genre[0], releaseDate: new Date(releaseDate), rating: parseFloat(rating[0]), posterUrl }
      })
      res.status(200).json(updatedMovie)
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to save movie' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const movie = await prisma.movie.findUnique({
        where: { id: Number(id) },
      });

      if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }

      if(!movie.posterUrl.includes("seed-uploads")) {
        // Get the poster file path
        const posterPath = path.join(process.cwd(), 'public', movie.posterUrl);

        // Delete the poster file
        try {
          await fs.unlink(posterPath);
        } catch (error) {
          console.log(error, 'Error deleting poster file');
        }
      }

      // Delete the movie record
      await prisma.movie.delete({ where: { id: Number(id) } });

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ message: 'Failed to delete movie' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
