// /src/features/product/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/api/api";
// Типы данных

interface Product {
  id: number;
  title: string;
  desc: string;
  image: string;
  styleType: string;
  card: {};
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await api.get("products/");
      // console.log(res);
      return res.data;
    } catch (error) {
      console.log("Failed to fetch products", error);
      throw error;
    }
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: { formData: FormData }) => {
    try {
      const res = await api.post(`products/`, productData.formData);
      return res.data;
    } catch (error) {
      console.log("Error add product: ", error);
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }: { id: number; formData: FormData }) => {
    try {
      const response = await api.put(`products/${id}/`, formData);
      return response.data;
    } catch (error) {
      console.error("Error updating product: ", error);
      throw error;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    try {
      await api.delete(`/products/${id}/`);
      return id;
    } catch (error) {
      console.error("Failed to delete product:", error);
      throw error;
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export default productSlice.reducer;
