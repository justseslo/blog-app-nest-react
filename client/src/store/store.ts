import { authReducer } from "@/features/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({ reducer: {
    auth:authReducer
}});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
