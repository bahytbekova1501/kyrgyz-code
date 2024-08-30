import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import portfolioSlice from "./slices/portfolioSlice";
import portfolioCardSlice from "./slices/portfolioCardSlice";
import authSlice from "./authSlices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    portfolio: portfolioSlice,
    card: portfolioCardSlice,
  },
  devTools: process.env.NODE_ENV !== "production", // Включение Redux DevTools только в режиме разработки
});
// Экспорт типов для использования в компоненте
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
