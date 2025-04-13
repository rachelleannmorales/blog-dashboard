'use client';

import { useGetBlogPostQuery } from '@/features/api/postApi';
import { Alert, Card, CardContent, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import Loader from './Loader';
interface PostDetailProps {
  id: string;
}

export default function PostDetail({ id }: PostDetailProps) {
  const { data: post, isLoading, error } = useGetBlogPostQuery(id);

  if (isLoading) {
    return <Loader />
  }

  if (error || !post) {
    return (
      <Alert severity="error" sx={{ width: '100%' }}>
        Error loading post
      </Alert>
    );
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <div className='flex justify-between'>
        <Typography variant="h4" component="h1" gutterBottom className="capitalize">
          {post.title}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </Typography>
        </div>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          By {post.author}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
} 