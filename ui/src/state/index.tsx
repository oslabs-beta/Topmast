import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      console.log(`Mode changed to ${state.mode} in state-index.tsx`);
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
