import { render, screen } from '@testing-library/react';
import PostCard from '../PostCard';

const mockPost = {
  id: '1',
  title: 'Test Post Title',
  body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  author: 'Test Author',
  createdAt: new Date().toISOString(),
};

describe('PostCard', () => {
  it('renders post title and author', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockPost.author))).toBeInTheDocument();
  });

  it('truncates long post body', () => {
    render(<PostCard post={mockPost} />);
    
    const displayedText = screen.getByText(new RegExp(mockPost.body.slice(0, 20)));
    expect(displayedText).toBeInTheDocument();
    expect(displayedText.textContent).toContain('...');
  });

  it('includes a link to the post detail page', () => {
    render(<PostCard post={mockPost} />);
    
    const links = screen.getAllByRole('link');
    expect(links.some(link => link.getAttribute('href') === `/${mockPost.id}`)).toBe(true);
  });
}); 