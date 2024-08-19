import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import portfolioSlice from "./slices/portfolioSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    portfolio: portfolioSlice,
  },
  devTools: process.env.NODE_ENV !== "production", // Включение Redux DevTools только в режиме разработки
});
// Экспорт типов для использования в компоненте
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
