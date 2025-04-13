'use client';

import { BlogPost } from '@/features/types/types';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <div className='flex justify-between'>
        <Link href={`/${post.id}`}>
        <Typography variant="h5" component="h2" gutterBottom className='capitalize'>
          {post.title}
        </Typography>
        </Link>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </Typography>
        </div>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          <PersonIcon /> {post.author}
        </Typography>
        <Typography variant="body1">
          {post.body.slice(0, 150)}
          {post.body.length > 150 ? '...' : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/${post.id}`}>
          <Button 
            size="small"
            variant="contained"
          >
          Read More
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
