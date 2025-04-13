import { Typography, Button } from '@mui/material';
import BlogPostList from '@/components/BlogPostList';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import { postApi } from '@/features/api/postApi';
import { store } from '@/store/store';

export default async function Home() {

  // First page is server-rendered for SEO and performance.
  // Remaining content loads via infinite scroll using IntersectionObserver.
  const result = await store.dispatch(
    postApi.endpoints.getBlogPosts.initiate({ page: 1, limit: 10 })
  );

  const { data: initialData } = result;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1">
          Blog Posts
        </Typography>
        <Link href="/new">
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Link>
      </div>
      <BlogPostList initialData={initialData?.items || []} />
    </>
  );
}
