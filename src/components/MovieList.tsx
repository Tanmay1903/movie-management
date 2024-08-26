import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOrEditMovieForm from './AddOrEditMovieForm';

interface Movie {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  rating: number;
  posterUrl: string;
}

interface MovieListProps {
    movies: Movie[];
    fetchMovies: () => Promise<void>;
}

export default function MovieList({ movies, fetchMovies}: MovieListProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await axios.delete(`/api/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Failed to delete movie', error);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedMovie(null);
  };

  const handleFormSubmitSuccess = () => {
    // Re-fetch the movies after adding or editing
    fetchMovies();
  };

  if (movies.length === 0) {
    return <Typography variant="h6">No movies available</Typography>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Card key={movie.id} className="flex relative" sx={{ height: '150px' }}>
            <CardMedia
              component="img"
              sx={{
                width: '40%',
                height: '100%',
                objectFit: 'contain',
              }}
              image={movie.posterUrl}
              alt={movie.title}
            />
            <CardContent sx={{ width: '60%' }}>
              <Typography variant="h6" component="div">
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Genre: {movie.genre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {movie.rating}
              </Typography>
              <div className="absolute bottom-2 right-2">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleEditClick(movie)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => handleDeleteClick(movie.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {isFormOpen && (
        <AddOrEditMovieForm
          open={isFormOpen}
          onClose={handleCloseForm}
          initialValues={selectedMovie || undefined}
          onSubmitSuccess={handleFormSubmitSuccess}
        />
      )}
    </>
  );
}
