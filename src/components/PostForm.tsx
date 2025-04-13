'use client';

import { useState } from 'react';
import { 
  Alert,
  Button,
  Card,
  CardContent,
  TextField,
  Typography 
} from '@mui/material';
import { FormData } from '@/features/types/types';
interface PostFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
  error: { message: string } | null;
}

export default function PostForm({ onSubmit, isLoading, error }: PostFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    body: '',
    author: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { author, title, body } = formData;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error creating post
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Author"
            name="author"
            value={author}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Content"
            name="body"
            value={body}
            onChange={handleChange}
            required
            multiline
            rows={6}
            sx={{ mb: 3 }}
          />

          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="start"
            fullWidth
            aria-label="Save"
          >
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 