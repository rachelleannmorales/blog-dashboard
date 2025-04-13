import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BlogPost, PaginatedState } from '../types/types';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL 
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getBlogPosts: builder.query<PaginatedState<BlogPost>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: 'posts',
        params: {
          page,
          limit,
          sortBy: 'id',
          order: 'desc',
        },
      }),
      providesTags: (result) => 
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: `PAGE_${result.currentPage}` },
            ]
          : [{ type: 'Post', id: 'LIST' }],
      transformResponse: (response: BlogPost[], meta, arg) => {
        return {
          items: response,
          hasMore: response.length === arg.limit,
          currentPage: arg.page || 1
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.currentPage === 1) {
          return newItems;
        }
        return {
          items: [...currentCache.items, ...newItems.items],
          hasMore: newItems.hasMore,
          currentPage: newItems.currentPage
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      }
      
    }),
    getBlogPost: builder.query<BlogPost, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createBlogPost: builder.mutation<BlogPost, Omit<BlogPost, 'id'>>({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: 'PAGE_1' }
      ],
    }),
  }),
});

export const { 
  useGetBlogPostsQuery,
  useGetBlogPostQuery,
  useCreateBlogPostMutation,
} = postApi; 