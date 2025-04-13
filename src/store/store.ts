import { configureStore } from '@reduxjs/toolkit';
import { postApi } from '@/features/api/postApi';
import paginationReducer from '@/store/paginationSlice';
export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];