import { createSlice } from "@reduxjs/toolkit";

const draftOderSlice = createSlice({
    name: "draftOders",
    initialState: {
      posts: [],
      loading: false,
      error: null,
    },
    reducers: {
        addDraftOderStart(state) {
            state.loading = true;
            state.error = null;
        },
        addDraftOderSuccess(state, action) {
            state.loading = false;
            state.posts.push(action.payload);
            state.error = null;
        },
        addDraftOderError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteDraftOderStart(state) {
            state.loading = true;
          },
          deleteDraftOderSuccess(state) {
            state.loading = false;
          },
          deleteDraftOderError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addDraftOderStart,
    addDraftOderSuccess,
    addDraftOderError,
    deleteDraftOderStart,
    deleteDraftOderSuccess,
    deleteDraftOderError,
} = draftOderSlice.actions;

export default draftOderSlice.reducer;