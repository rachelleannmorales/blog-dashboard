import { Suspense } from 'react';
import BackButton from '@/components/BackButton';
import PostDetail from '@/components/PostDetail';
import Loader from '@/components/Loader';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ 
  params 
}: PostPageProps) {
  const {id} = await params;

  return (
    <>
      <BackButton />
      <Suspense fallback={
         <Loader />
      }>
        <PostDetail id={id} />
      </Suspense>
    </>
  );
}