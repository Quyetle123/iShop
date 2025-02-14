import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    productStatistic: {},
    selectedCategory: null,
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCategories(state) {
      state.loading = true;
    },
    fetchCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoryById(state) {
      state.loading = true;
    },
    fetchCategoryByIdSuccess(state, action) {
      state.loading = false;
      state.selectedCategory = action.payload;
    },
    addCategoryStart(state) {
      state.loading = true;
    },
    addCategorySuccess(state, action) {
      state.loading = false;
      state.categories.push(action.payload);
      state.error = null;
    },
    updateCategoryStart(state) {
      state.loading = true;
    },
    updateCategorySuccess(state, action) {
      state.loading = false;
      const index = state.categories.filter(
        (cat) => (cat.id = action.payload.id)
      );
      state.categories[index] = action.payload;
    },
    deleteCategoryStart(state) {
      state.loading = true;
    },
    deleteCategorySuccess(state) {
      state.loading = false;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productStatisticStart(state) {
      state.loading = true;
      state.error = null;
    },
    productStatisticSuccess(state, action) {
      state.loading = false;
      state.productStatistic = action.payload;
      state.error = null;
    },
    productStatisticError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoryById,
  fetchCategoryByIdSuccess,
  addCategoryStart,
  addCategorySuccess,
  updateCategoryStart,
  updateCategorySuccess,
  deleteCategoryStart,
  deleteCategorySuccess,
  setError,
  productStatisticStart,
  productStatisticSuccess,
  productStatisticError
} = categorySlice.actions;

export default categorySlice.reducer;
