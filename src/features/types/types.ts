export interface BlogPost {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    author: string;
  }

export type FormData = Omit<BlogPost, 'id' | 'createdAt'>;

export interface PaginatedState<T> {
  items: T[];
  hasMore: boolean;
  currentPage: number;
}