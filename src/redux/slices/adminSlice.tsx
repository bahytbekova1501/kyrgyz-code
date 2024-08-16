// redux/adminSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  isAdmin: boolean;
}

const initialState: Admin = {
  isAdmin: true, // Инициализация из localStorage
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
      // localStorage.setItem("isAdmin", String(action.payload)); // Сохранение в localStorage
    },
    logoutAdmin(state) {
      state.isAdmin = false;
      // localStorage.removeItem("isAdmin"); // Удаление из localStorage
    },
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
