import { createSlice } from '@reduxjs/toolkit';

// Pagination slice for managing the current page of blog posts.
const paginationSlice = createSlice({
  name: 'pagination',
  initialState: { page: 1 },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = paginationSlice.actions;
export default paginationSlice.reducer;