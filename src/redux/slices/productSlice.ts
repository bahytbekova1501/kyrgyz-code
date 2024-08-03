// /src/features/product/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set, get, update, remove } from "@/firebaseConfig";
import { getDatabase } from "firebase/database";

// Типы данных

interface Product {
  id: number;
  title: string;
  desc: string;
  image: string;
  styleType: string;
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

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const db = getDatabase();
//     const productsRef = ref(db, "products");
//     const snapshot = await get(productsRef);
//     if (snapshot.exists()) {
//       return snapshot.val();
//     } else {
//       return [];
//     }
//   }
// );
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const db = getDatabase();
    const productsRef = ref(db, "products");
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : Object.values(data);
    } else {
      return [];
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Omit<Product, "id">) => {
    const db = getDatabase();
    const newProductId = Date.now(); // Генерация уникального id
    const productWithId = { ...product, id: newProductId };
    const productRef = ref(db, `products/${newProductId}`);
    await set(productRef, productWithId);
    return productWithId;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    const db = getDatabase();
    const productRef = ref(db, `products/${product.id}`);
    await update(productRef, product);
    return product;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    const db = getDatabase();
    const productRef = ref(db, `products/${id}`);
    await remove(productRef);
    return id;
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
