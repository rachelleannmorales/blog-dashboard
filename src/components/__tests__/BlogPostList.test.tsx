import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostList from '../BlogPostList';
import { useGetBlogPostsQuery } from '@/features/api/postApi';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { BlogPost } from '@/features/types/types';

jest.mock('@/components/PostCard', () => {
  function MockPostCard(props: BlogPost) {
    return <div data-testid="PostCard">{props.title}</div>;
  }
  return MockPostCard;
});

jest.mock('@/components/Loader', () => {
  function MockLoader() {
    return <div data-testid="Loader"></div>;
  }
  return MockLoader;
});

jest.mock('@/features/api/postApi', () => ({
  useGetBlogPostsQuery: jest.fn(),
}));
jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('BlogPostList', () => {
  const mockDispatch = jest.fn();
  const mockUseInView = useInView as jest.Mock;
  const mockUseGetBlogPostsQuery = useGetBlogPostsQuery as jest.Mock;
  const mockUseSelector = useSelector as jest.Mock;

  const fakePosts: BlogPost[] = [
    { id: '1', title: 'Post 1', body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...`, author: 'A', createdAt: new Date().toISOString() },
    { id: '2', title: 'Post 2', body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...`, author: 'B', createdAt: new Date().toISOString() },
  ];

  beforeEach(() => {
    mockDispatch.mockClear();
    mockUseSelector.mockReturnValue(1); // page = 1
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockUseInView.mockReturnValue({ ref: jest.fn(), inView: false });
  });

  it('renders posts and not loader or error by default', () => {
    mockUseGetBlogPostsQuery.mockReturnValue({
      data: { items: fakePosts, hasMore: true, currentPage: 1 },
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(<BlogPostList initialData={fakePosts} />);

    expect(screen.getAllByTestId('PostCard')).toHaveLength(2);
    expect(screen.queryByTestId('Loader')).not.toBeInTheDocument();
    expect(screen.queryByText(/Error loading posts/i)).not.toBeInTheDocument();
  });

  it('shows loader when loading or fetching', () => {
    mockUseGetBlogPostsQuery.mockReturnValue({
      data: { items: fakePosts, hasMore: true, currentPage: 1 },
      isLoading: true,
      isFetching: false,
      error: null,
    });

    render(<BlogPostList initialData={fakePosts} />);

    expect(screen.getByTestId('Loader')).toBeInTheDocument();
  });

  it('shows error alert when query fails', () => {
    mockUseGetBlogPostsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: true,
    });

    render(<BlogPostList initialData={[]} />);

    expect(screen.getByText(/Error loading posts/i)).toBeInTheDocument();
  });

  it('dispatches next page when inView and hasMore', () => {
    mockUseInView.mockReturnValue({ ref: jest.fn(), inView: true });

    mockUseGetBlogPostsQuery.mockReturnValue({
      data: { items: fakePosts, hasMore: true, currentPage: 1 },
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(<BlogPostList initialData={fakePosts} />);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'pagination/setPage', payload: 2 });
  });
});
