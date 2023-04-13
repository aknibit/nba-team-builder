import { configureStore } from '@reduxjs/toolkit'
import loaderReducer from './reducers/loaderSlice'
import autoTeamReducer from './reducers/autoTeamSlice'

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    autoTeam: autoTeamReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch