import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { rootReducer } from "./reducers/root-reducer";
import { createWrapper } from "next-redux-wrapper";

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>

export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<RootStore>(makeStore, { debug: false });