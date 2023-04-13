import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AutoTeamState } from '../config/interfaces';

const namespace = 'autoTeam'

const initialState: AutoTeamState = {
  PG: { position: 'PG' },
  SG: { position: 'SG' },
  SF: { position: 'SF' },
  PF: { position: 'PF' },
  C:  { position: 'C' },
};

export const autoTeamSlice = createSlice({
  name: namespace,
  initialState,
  reducers:{
    setPG: (state, action) => {
        state.PG = action.payload;
    },
    setSG: (state, action) => {
      state.SG = action.payload;
    },
    setSF: (state, action) => {
      state.SF = action.payload;
    },
    setPF: (state, action) => {
      state.PF = action.payload;
    },
    setC: (state, action) => {
      state.C = action.payload;
    }
  }
});

export const getAutoTeamStatus = (state: RootState) => state.autoTeam;
export const { setPG, setSG, setSF, setPF, setC } = autoTeamSlice.actions;
export default autoTeamSlice.reducer;
