import { configureStore } from "@reduxjs/toolkit";
import { shoppingListApi } from "./api";

export const shoppingListStore = configureStore({
  reducer: {
    [shoppingListApi.reducerPath]: shoppingListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shoppingListApi.middleware),
});

export type RootState = ReturnType<typeof shoppingListStore.getState>;
