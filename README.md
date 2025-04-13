# Blog Posts Dashboard

## Features :dancer:
- Blog posts are displayed in a list with infinite scroll
- User can create a new blog post
- User can view a blog post 

## Design Decisions & Challenges :thinking:
### 1. Folder Structure
I used a feature-based modular architecture to promote separation of concerns, improve maintainability, and scale the codebase as new features are added

### 2. SSR for First Page + Infinite Scroll for the Rest
To balance performance, SEO, and user experience, I chose a hybrid rendering approach for displaying blog posts. I use SSR for the first page to improve SEO and performance, and then use client-side rendering for the remaining content using infinite scroll. This hybrid setup delivers both a fast and SEO-optimized entry point and a seamless browsing experience as users scroll.

### 3. Responsive Layout
For the layout of the blog posts, I implemented 2 columns for desktop and 1 column for mobile. The 2 column layout maximizes the content on larger screens, providing a more compact and visually appealing grid. The 1 column layout prioritizes readability and ease of navigation on smaller screens, ensuring a smooth experience on all devices.

### 4. Limitations :warning:
While implementing sorting functionality for blog posts, I encountered limitations with MockAPI. The sorting parameters were either inconsistently applied or did not reflect expected results, especially when combined with pagination.

In a real-world scenario, using a custom backend would resolve this issue.

## Things I would do differently if I had more time :thinking:
- Create a custom backend to avoid the limitations of MockAPI
- Use react-hook-form and zod for form handling and validation
- Add more unit tests

## Installation :gear:
1. Clone this repository
2. Install dependencies with `npm install`
3. Create a `.env` file and add the following:
```
NEXT_PUBLIC_API_URL=https://67f96c2e094de2fe6ea1854e.mockapi.io/api
```
4. Start the application with `npm run dev`

## Run tests :white_check_mark:
```
npm run test
```

## Live Demo :computer:
[Live Demo](https://blog-posts-dashboard.vercel.app/)