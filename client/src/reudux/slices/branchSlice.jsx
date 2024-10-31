import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branches",
  initialState: {
    branches: [],
    loading: false,
    error: null,
  },
  reducers: {
    addBranchStart(state) {
      state.loading = true;
      state.error = false;
    },
    addBranchSuccess(state, action) {
      state.loading = false;
      state.branches.push(action.payload);
      state.error = null;
    },
    addBranchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllBranchStart(state) {
      state.loading = true;
      state.error = false;
    },
    fetchAllBranchSuccess(state, action) {
      state.loading = false;
      state.branches = action.payload;
    },
    fetchAllBranchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addBranchStart,
  addBranchSuccess,
  addBranchFailure,
  fetchAllBranchStart,
  fetchAllBranchSuccess,
  fetchAllBranchFailure,
} = branchSlice.actions;

export default branchSlice.reducer;
