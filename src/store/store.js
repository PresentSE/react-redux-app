import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger";
import taskReduser from "./task";

export function createStore() {
  return configureStore({
    reducer: taskReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export default createStore;
