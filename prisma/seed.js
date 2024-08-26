// prisma/seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Example movies
  const movies = [
    {
      title: 'Inception',
      genre: 'Science Fiction',
      releaseDate: new Date('2010-07-16'),
      rating: 8.8,
      posterUrl: '/seed-uploads/inception.jpg',
    },
    {
      title: 'The Dark Knight',
      genre: 'Action',
      releaseDate: new Date('2008-07-18'),
      rating: 9.0,
      posterUrl: '/seed-uploads/dark-knight.jpg',
    },
    {
      title: 'Interstellar',
      genre: 'Science Fiction',
      releaseDate: new Date('2014-11-07'),
      rating: 8.6,
      posterUrl: '/seed-uploads/interstellar.jpg',
    },
    {
      title: 'The Matrix',
      genre: 'Action',
      releaseDate: new Date('1999-03-31'),
      rating: 8.7,
      posterUrl: '/seed-uploads/matrix.jpg',
    },
    {
      title: 'Forrest Gump',
      genre: 'Drama',
      releaseDate: new Date('1994-07-06'),
      rating: 8.8,
      posterUrl: '/seed-uploads/forrest-gump.jpg',
    },
  ];

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
