// components/MovieFilterSort.tsx
import { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';

interface FilterSortProps {
  onFilterSort: (filters: { genre?: string; sortBy?: string }) => void;
}

export default function MovieFilter({ onFilterSort }: FilterSortProps) {
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleFilterSort = () => {
    onFilterSort({ genre, sortBy });
  };

  return (
    <Grid container spacing={2} alignItems="center" className="mb-4">
      <Grid item xs={5}>
        <TextField
          label="Filter by Genre"
          fullWidth
          value={genre}
          size='small'
          onChange={(e) => setGenre(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Sort by"
          select
          fullWidth
          value={sortBy}
          size='small'
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="primary" fullWidth onClick={handleFilterSort}>
          Apply
        </Button>
      </Grid>
    </Grid>
  );
}
