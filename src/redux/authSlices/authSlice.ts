// store/authSlice.ts
import api from "@/api/api";
import { getLocalStorageItem } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  accessToken: getLocalStorageItem("accessToken") || null,
  refreshToken: getLocalStorageItem("refreshToken") || null,
  loading: false,
  error: null,
  isAdmin: JSON.parse(getLocalStorageItem("isAdmin") || "false"),
};
// Асинхронное действие для входа пользователя
export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("login/", {
        username,
        password,
      });
      const { access, refresh } = response.data;
      // Определяем, является ли пользователь администратором
      const isAdmin = username === "superuser" && password === "1";
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
      }
      return { access, refresh, isAdmin };
      //   return response.data; // Данные ответа с сервера (access и refresh токены)
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.message ||
          "Неверный логин или пароль"
      );
    }
  }
);
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async ({ refresh }: { refresh: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://yourapi.com/login/refresh/", {
        refresh,
      });
      const { access } = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", access);
      }
      return access;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAdmin = false; // Сбрасываем статус администратора при выходе
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isAdmin");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAdmin = action.payload.isAdmin;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
