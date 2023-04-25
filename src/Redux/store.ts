import { configureStore } from '@reduxjs/toolkit';
import techCityAPI from './api/tech-city-api';
// ...

export const store = configureStore({
  reducer: {
    [techCityAPI.reducerPath]: techCityAPI.reducer
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(techCityAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch