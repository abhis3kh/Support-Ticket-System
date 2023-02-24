import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// creating initial state
const inititalState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  inititalState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
