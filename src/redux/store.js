import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/CategorySlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export default store;
