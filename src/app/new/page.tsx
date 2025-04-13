'use client';

import BackButton from '@/components/BackButton';
import PostForm from '@/components/PostForm';
import { useRouter } from 'next/navigation';
import { useCreateBlogPostMutation } from '@/features/api/postApi';
import { setPage } from '@/store/paginationSlice';
import { useDispatch } from 'react-redux';
import { FormData } from '@/features/types/types';

export default function NewPostPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [createPost, { isLoading, error }] = useCreateBlogPostMutation();

  const onSubmit = async (formData: FormData) => {
      const result = await createPost({
        ...formData,
        createdAt: new Date().toISOString()
      }).unwrap();
      dispatch(setPage(1));
      router.push(`/${result.id}`); 
  };
  return (
    <>
      <BackButton />
      <PostForm onSubmit={onSubmit} isLoading={isLoading} error={error as { message: string } | null} />
    </>
  );
} 