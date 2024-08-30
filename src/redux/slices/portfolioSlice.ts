import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  PortfolioCardTypes,
  PortfolioProductTypes,
  StyleType,
} from "@/types/card.types";
import api from "@/api/api";
import axios from "axios";
interface Poprtfolio {
  id: number;
  title: string;
  days: string;
  company: string;
  blgimage: string;
}

interface PortfolioState {
  portfolio: Poprtfolio[];
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: PortfolioState = {
  portfolio: [],
  loading: false,
  status: "idle",
  error: null,
};

export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetchPortfolio",
  async () => {
    try {
      const response = await api.get("portfolio/");
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Ошибка при получении портфолио:", error);
      return [];
    }
  }
);

export const addPortfolio = createAsyncThunk(
  "portfolio/addPortfolio",
  async (productData: { formData: FormData }) => {
    try {
      const res = await api.post(`portfolio/`, productData.formData);
      return res.data;
    } catch (error) {
      console.log("Error add portfolio: ", error);
      throw error;
    }
  }
);

// export const addPortfolio = createAsyncThunk(
//   "portfolio/addPortfolio",
//   async (portfolioItem: Omit<PortfolioProductTypes, "id">) => {
//     const db = getDatabase();
//     const newProductId = Date.now();
//     const productWithId = { ...portfolioItem, id: newProductId };
//     const productRef = ref(db, `portfolio/${newProductId}`);
//     await set(productRef, productWithId);
//     return productWithId;
//   }
// );

// export const updatePortfolio = createAsyncThunk(
//   "portfolio/updatePortfolio",
//   async (portfolioItem: PortfolioProductTypes) => {
//     const db = getDatabase();
//     const portfolioRef = ref(db, `portfolio/${portfolioItem.id}`);
//     await update(portfolioRef, {
//       title: portfolioItem.title,
//       days: portfolioItem.days,
//       company: portfolioItem.company,
//     });
//     return portfolioItem;
//   }
// );

// export const addCardToPortfolio = createAsyncThunk(
//   "portfolio/addCardToPortfolio",
//   async ({
//     portfolioId,
//     card,
//   }: {
//     portfolioId: number;
//     card: PortfolioCardTypes;
//   }) => {
//     const db = getDatabase();
//     const cardRef = ref(db, `portfolio/${portfolioId}/card/${card.id}`);
//     await set(cardRef, card);
//     return { portfolioId, card };
//   }
// );

// export const updateCardInPortfolio = createAsyncThunk(
//   "portfolio/updateCardInPortfolio",
//   async ({
//     portfolioId,
//     card,
//   }: {
//     portfolioId: number;
//     card: PortfolioCardTypes;
//   }) => {
//     const db = getDatabase();
//     const cardRef = ref(db, `portfolio/${portfolioId}/card/${card.id}`);
//     await update(cardRef, card);
//     return { portfolioId, card };
//   }
// );

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolio = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch portfolio";
      })
      .addCase(addPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolio.push(action.payload);
      })
      .addCase(addPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add portfolio";
      });
    // .addCase(updatePortfolio.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updatePortfolio.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const index = state.portfolio.findIndex(
    //     (p) => p.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.portfolio[index] = action.payload;
    //   }
    // })
    // .addCase(updatePortfolio.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || "Failed to update portfolio";
    // })
    // .addCase(addCardToPortfolio.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(addCardToPortfolio.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const { portfolioId, card } = action.payload;
    //   const portfolio = state.portfolio.find((p) => p.id === portfolioId);
    //   if (portfolio) {
    //     portfolio.card.push(card);
    //   }
    // })
    // .addCase(addCardToPortfolio.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || "Failed to add card to portfolio";
    // })
    // .addCase(updateCardInPortfolio.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updateCardInPortfolio.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const { portfolioId, card } = action.payload;
    //   const portfolio = state.portfolio.find((p) => p.id === portfolioId);
    //   if (portfolio) {
    //     const cardIndex = portfolio.card.findIndex((c) => c.id === card.id);
    //     if (cardIndex !== -1) {
    //       portfolio.card[cardIndex] = card;
    //     }
    //   }
    // })
    // .addCase(updateCardInPortfolio.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error =
    //     action.error.message || "Failed to update card in portfolio";
    // });
  },
});

export default portfolioSlice.reducer;
