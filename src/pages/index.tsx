import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';
import AddOrEditMovieForm from '../components/AddOrEditMovieForm';
import { Button } from '@mui/material';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  rating: number;
  posterUrl: string;
}
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filters, setFilters] = useState<{ genre?: string; sortBy?: string }>({});
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);

  async function fetchMovies() {
    try {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
      setFilteredMovies(response.data); // Initially, all movies are shown
    } catch (error) {
      console.error('Failed to fetch movies', error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, movies]);

  const applyFilters = () => {
    let filtered = [...movies];

    // Filter by genre
    if (filters.genre) {
      filtered = filtered.filter((movie) => movie.genre.includes(filters.genre ?? ''));
    }

    // Sort movies
    if (filters.sortBy) {
      filtered = filtered.sort((a, b) => {
        if (filters.sortBy === 'releaseDate') {
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        }
        if (filters.sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return 0;
      });
    }

    setFilteredMovies(filtered);
  };

  const handleFilterSort = (newFilters: { genre?: string; sortBy?: string }) => {
    setFilters(newFilters);
  };

  const handleOpenAddMovie = () => setIsAddMovieOpen(true);
  const handleCloseAddMovie = () => setIsAddMovieOpen(false);

  return (
    <Layout>
      <div className="container mx-auto">
        <MovieFilter onFilterSort={handleFilterSort} />
        <div className="flex justify-end items-center mb-4">
          <Button variant="contained" color="primary" onClick={handleOpenAddMovie}>
            Add Movie
          </Button>
        </div>
        <MovieList movies={filteredMovies} fetchMovies={fetchMovies} />
        <AddOrEditMovieForm open={isAddMovieOpen} onClose={handleCloseAddMovie} onSubmitSuccess={fetchMovies} />
      </div>
    </Layout>
  );
}
