// pages/index.tsx
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';
import AddOrEditMovieForm from '../components/AddOrEditMovieForm';
import { Button } from '@mui/material';
import axios from 'axios';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState<{ genre?: string; sortBy?: string }>({});
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);

  async function fetchMovies() {
    const response = await axios.get('/api/movies');
    setMovies(response.data);
  }

  useEffect(() => {
    fetchMovies();
  }, []);
  const handleFilterSort = (newFilters: { genre?: string; sortBy?: string }) => {
    setFilters(newFilters);
    // Implement logic to filter and sort the movies based on the filters.
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
        <MovieList movies={movies} fetchMovies={fetchMovies} />
        <AddOrEditMovieForm open={isAddMovieOpen} onClose={handleCloseAddMovie} onSubmitSuccess={fetchMovies}/>
      </div>
    </Layout>
  );
}
