import { configureStore } from '@reduxjs/toolkit'
import { projectListSlice } from 'page/projectListPage/projectList.slice'
import { authSlice } from './auth.slice'

export const rootReducer ={
  projectList:projectListSlice.reducer,
  auth:authSlice.reducer
}

export const store =configureStore({
  reducer:rootReducer
})

export type AppDispatch = typeof store.dispatch
export type  RootState = ReturnType<typeof store.getState>