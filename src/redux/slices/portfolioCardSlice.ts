import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getDatabase, ref, update, get } from "firebase/database";

// Интерфейсы для описания структуры данных
interface Card {
  id: number;
  title: string;
}

interface AddCardPayload {
  portfolioId: number;
  card: Card;
}
// Интерфейс для начального состояния
interface CardState {
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: CardState = {
  loading: false,
  error: null,
};
export const addCardToPortfolio = createAsyncThunk(
  "card/addCardToPortfolio",
  async ({ portfolioId, card }: AddCardPayload, { rejectWithValue }) => {
    try {
      const db = getDatabase();
      const portfolioRef = ref(db, `portfolio/${portfolioId}`);
      const snapshot = await get(portfolioRef);

      if (!snapshot.exists()) {
        return rejectWithValue("Portfolio not found");
      }

      const currentData = snapshot.val();
      const updatedCardList = currentData.card
        ? [...currentData.card, card]
        : [card];

      await update(portfolioRef, { card: updatedCardList });

      return { portfolioId, card };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Создание слайса для управления состоянием карточек
const portfolioCardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCardToPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCardToPortfolio.fulfilled,
        (state, action: PayloadAction<{ portfolioId: number; card: Card }>) => {
          state.loading = false;
        }
      )
      .addCase(addCardToPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default portfolioCardSlice.reducer;
