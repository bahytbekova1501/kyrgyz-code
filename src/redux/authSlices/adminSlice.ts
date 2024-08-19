// redux/slices/adminSlice.ts
import api from "@/api/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface AdminState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  adminData: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AdminState = {
  isAuthenticated: false,
  isAdmin: false,
  adminData: null,
  status: "idle",
  error: null,
};

// Асинхронный thunk для логина
export const login = createAsyncThunk(
  "admin/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("users/login/", credentials);
      return response.data;
    } catch (error) {
      const message = (error as any).response?.data?.message || "Unknown error";
      return rejectWithValue(message);
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
      state.adminData = null;
    },
    setAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.adminData = action.payload;
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
