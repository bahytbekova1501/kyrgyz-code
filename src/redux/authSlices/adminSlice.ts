// redux/slices/adminSlice.ts
import api from "@/api/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface AdminInfo {
  username: string;
  token: string;
}
interface AdminState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  adminInfo: AdminInfo | null;
  loading: boolean;
  // status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AdminState = {
  isAuthenticated: false,
  isAdmin: false,
  adminInfo: null,
  // status: "idle",
  error: null,
  loading: false,
};
export const login = createAsyncThunk(
  "admin/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("login/", {
        username,
        password,
      });
      const { token, username: adminUsername } = response.data;

      // Сохранение токена в localStorage
      localStorage.setItem("adminToken", token);

      return { username: adminUsername, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка входа");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.adminInfo = null;
      state.error = null;
      localStorage.removeItem("adminToken");
    },
    setAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.adminInfo = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.adminInfo = null;
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { logout, setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
