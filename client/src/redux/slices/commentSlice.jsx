import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCommentsStart(state) {
      state.loading = true;
    },
    fetchCommentSuccess(state, action) {
      state.loading = false;
      state.comments = action.payload;
    },
    fetchCommentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentStart(state) {
      state.loading = false;
      state.error = null;
    },
    addCommentSuccess(state, action) {
      state.loading = false;
      state.comments.push(action.payload);
      state.error = null;
    },
    addCommentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentSuccess,
  fetchCommentFailure,
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
