import { createSlice } from "@reduxjs/toolkit";

const inventoryHistorySlice = createSlice({
  name: "inventoryHistories",
  initialState: {
    inventoryHistories: [],
    loading: false,
    error: null,
  },
  reducers: {
    addInventoryHistoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    addInventoryHistorySuccess(state, action) {
      state.loading = false;
      state.inventoryHistories.push(action.payload);
      state.error = null;
    },
    addInventoryHistoryError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchInventoryHistoriesByStoreIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchInventoryHistoriesByStoreIdSuccess(state, action) {
      state.loading = false;
      state.inventoryHistories = action.payload;
      state.error = null;
    },
    fetchInventoryHistoriesByStoreIdError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addInventoryHistoryStart,
  addInventoryHistorySuccess,
  addInventoryHistoryError,
  fetchInventoryHistoriesByStoreIdStart,
  fetchInventoryHistoriesByStoreIdSuccess,
  fetchInventoryHistoriesByStoreIdError,
} = inventoryHistorySlice.actions;

export default inventoryHistorySlice.reducer;
