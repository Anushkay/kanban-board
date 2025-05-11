// src/lib/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './kanbanSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      kanban: kanbanReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];