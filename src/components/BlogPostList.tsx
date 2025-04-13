'use client';

import { useEffect } from 'react';
import { useGetBlogPostsQuery } from '@/features/api/postApi';
import PostCard from '@/components/PostCard';
import { Grid, Alert } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader';
import { BlogPost } from '@/features/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '@/store/paginationSlice';
import { RootState } from '@/store/store';
const POSTS_PER_PAGE = 10;

export default function BlogPostList({ initialData }: { initialData: BlogPost[] }) {
    const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.pagination.page);
  
  const { ref: loadMoreRef, inView } = useInView();

  const {
    data = { items: initialData, hasMore: true, currentPage: 1 },
    isLoading,
    isFetching,
    error,
  } = useGetBlogPostsQuery({ 
    page,
    limit: POSTS_PER_PAGE,
  });

  useEffect(() => {
    if (inView && data?.hasMore && !isFetching) {
      dispatch(setPage(page + 1));
    }
  }, [inView, data?.hasMore, isFetching, dispatch, page]);

  if (error) {
    return (
      <Alert severity="error" sx={{ width: '100%' }}>
        Error loading posts
      </Alert>
    );
  }

  return (
    <>
      <Grid 
        container 
        spacing={3}
        sx={{
          mb: 4,
        }}
      >
        {data?.items?.map((post) => (
            <Grid size={{ md: 6, sm: 12, xs: 12 }} key={post.id}>
                <PostCard post={post} />
            </Grid>
        ))}
      </Grid>

      {(isLoading || isFetching) && (
        <Loader />
      )}

      <div ref={loadMoreRef} style={{ height: '20px' }} />
    </>
  );
} 