import { createSlice } from "@reduxjs/toolkit";

const vourcherSlice = createSlice({
  name: "vourcher",
  initialState: {
    vourchers: [],
    selectedVourcher: null,
    loading: false,
    error: null,
  },
  reducers: {
    addVourcherStart(state) {
      state.loading = true;
      state.error = null;
    },
    addVourcherSuccess(state, action) {
      state.loading = false;
      state.vourchers.push(action.payload);
      state.error = null;
    },
    addVourcherError(state, action) {
        state.loading = false;
        state.error = action.payload;
    },
    fetchVourchersStart(state) {
        state.loading = true;
        state.error = null;
    },
    fetchVourchersSuccess(state, action) {
        state.loading = false;
        state.vourchers = action.payload;
    },
    fetchVourchersError(state, action) {
        state.loading = false;
        state.error = action.payload;
    },
    fetchVourcherByIdStart(state) {
        state.loading = true;
        state.error = null
    },
    fetchVourcherByIdSuccess(state, action) {
        state.loading = false;
        state.selectedVourcher = action.payload;
    },
    fetchVourcherByIdError(state, action) {
        state.loading = false;
        state.error = action.payload;
    },
    updateVourcherStart(state) {
        state.loading = true;
        state.error = null;
    },
    updateVourcherSuccess(state) {
        state.loading = false;
    },
    updateVourcherError(state, action) {
        state.loading = false;
        state.error = action.payload
    }
  },
});

export const {
    addVourcherStart,
    addVourcherSuccess,
    addVourcherError,
    fetchVourchersStart,
    fetchVourchersSuccess,
    fetchVourchersError,
    fetchVourcherByIdStart,
    fetchVourcherByIdSuccess,
    fetchVourcherByIdError,
    updateVourcherStart,
    updateVourcherSuccess,
    updateVourcherError
} = vourcherSlice.actions;

export default vourcherSlice.reducer;
