import React from 'react';
import { render, screen } from '@testing-library/react';
import PostForm from '../PostForm';
import userEvent from '@testing-library/user-event';
describe('PostForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields', () => {
    render(<PostForm onSubmit={mockOnSubmit} isLoading={false} error={null} />);

    expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Author' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Content' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
  
    render(<PostForm onSubmit={mockOnSubmit} isLoading={false} error={null} />);
  
    const titleInput = screen.getByRole('textbox', { name: 'Title' }) as HTMLInputElement;
    const authorInput = screen.getByRole('textbox', { name: 'Author' });
    const contentInput = screen.getByRole('textbox', { name: 'Content' });
  
    await user.type(titleInput, 'Test Title');
    await user.type(authorInput, 'Test Author');
    await user.type(contentInput, 'Test content');
  
    expect(titleInput.value).toBe('Test Title');
  
    await user.click(screen.getByRole('button', { name: 'Save' }));
  
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      body: 'Test content',
    });
  });

  it('disables submit button when isLoading is true', () => {
    render(<PostForm onSubmit={mockOnSubmit} isLoading={true} error={null} />);
    
    const submitButton = screen.getByRole('button', { name: 'Save' });
    expect(submitButton).toBeDisabled();
  });

  it('shows error alert when error is provided', () => {
    render(<PostForm onSubmit={mockOnSubmit} isLoading={false} error={{ message: 'Something went wrong' }} />);
    
    expect(screen.getByText('Error creating post')).toBeInTheDocument();
  });
});
