import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products/category';

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk('/laptops', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addCategory = createAsyncThunk('category/addCategory', async (category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
});

export const updateCategory = createAsyncThunk('category/updateCategory', async (category) => {
  const response = await axios.put(`${API_URL}/${category.id}`, category);
  return response.data;
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (categoryId) => {
  await axios.delete(`${API_URL}/${categoryId}`);
  return categoryId;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    });
  },
});

export default categorySlice.reducer;
