import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const namespace = 'loader'

export const loaderSlice = createSlice({
  name: namespace,
  initialState: {
    loader: false
  },
  reducers:{
    setLoader: (state, action) => {
      // console.debug('comment of excitement removed')
      state.loader = action.payload
    }
  }
});

export const getLoaderStatus = (state: RootState) => state.loader;
export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
