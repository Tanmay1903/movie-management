import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import axios from 'axios';

interface AddOrEditMovieFormProps {
  open: boolean;
  onClose: () => void;
  initialValues?: {
    id?: number;
    title?: string;
    genre?: string;
    releaseDate?: string | Date;
    rating?: number;
    posterUrl?: string;
  };
  onSubmitSuccess?: () => void;
}

export default function AddOrEditMovieForm({
  open,
  onClose,
  initialValues = {},
  onSubmitSuccess,
}: AddOrEditMovieFormProps) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [genre, setGenre] = useState(initialValues.genre || '');
  const [releaseDate, setReleaseDate] = useState<string>(initialValues.releaseDate ? new Date(initialValues.releaseDate).toISOString().split('T')[0] : '');
  const [rating, setRating] = useState(initialValues.rating?.toString() || '');
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterUrl, setPosterUrl] = useState(initialValues.posterUrl || '');

  // useEffect(() => {
  //   setTitle(initialValues.title || '');
  //   setGenre(initialValues.genre || '');
  //   setReleaseDate(initialValues.releaseDate ? new Date(initialValues.releaseDate).toISOString().split('T')[0] : '');
  //   setRating(initialValues.rating?.toString() || '');
  //   setPosterUrl(initialValues.posterUrl || '');
  // }, [initialValues]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPosterFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    console.log('State values:', {
      title,
      genre,
      releaseDate,
      rating,
      posterFile,
      posterUrl,
    });
    let formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('releaseDate', releaseDate);
    formData.append('rating', rating);

    if (posterFile) {
      formData.append('posterFile', posterFile);
    } else {
      formData.append('posterUrl', posterUrl);
    }

    try {
      if (initialValues.id) {
        // Editing an existing movie
        await axios.put(`/api/movies/${initialValues.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Movie updated successfully!');
      } else {
        // Adding a new movie
        await axios.post('/api/movies', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Movie added successfully!');
      }
      setTitle('');
      setGenre('');
      setReleaseDate('');
      setRating('');
      setPosterUrl('');
      onClose();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('Failed to save movie', error);
      alert('Failed to save movie');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValues.id ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Genre"
          fullWidth
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Release Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Rating"
          type="number"
          fullWidth
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="my-4"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialValues.id ? 'Save Changes' : 'Add Movie'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
