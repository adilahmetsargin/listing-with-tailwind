import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  productDetail: {},
  brands: [],
  models: [],
  filters: {
    model: [],
    brand: [],
  },
  searchTerm: "",
  status: "idle",
  error: null,
  statusForDetail: "idle",
  errorForDetail: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://5fc9346b2af77700165ae514.mockapi.io/products/"
    );
    return response.data;
  }
);

export const fetchProductDetailById = createAsyncThunk(
  "products/fetchProductDetailById",
  async (productId) => {
    const response = await axios.get(
      `https://5fc9346b2af77700165ae514.mockapi.io/products/${productId}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByPrice(state, action) {
      const { sortBy } = action.payload;
      if (sortBy === "lowToHigh") {
        state.productList = [...state.productList].sort(
          (a, b) => a.price - b.price
        );
      } else if (sortBy === "highToLow") {
        state.productList = [...state.productList].sort(
          (a, b) => b.price - a.price
        );
      } else if (sortBy === "oldToNew") {
        state.productList = [...state.productList].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else if (sortBy === "newToOld") {
        state.productList = [...state.productList].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    addFilter: (state, action) => {
      const { filterType, filterValue } = action.payload;
      state.filters[filterType].push(filterValue);
    },
    removeFilter: (state, action) => {
      const { filterType, filterValue } = action.payload;
      state.filters[filterType] = state.filters[filterType].filter(
        (filter) => filter !== filterValue
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productList = action.payload;
        const uniqueBrands = [
          ...new Set(action.payload.map((product) => product.brand)),
        ];
        const uniqueModels = [
          ...new Set(action.payload.map((product) => product.model)),
        ];
        state.brands = uniqueBrands;
        state.models = uniqueModels;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductDetailById.pending, (state) => {
        state.statusForDetail = "loading";
      })
      .addCase(fetchProductDetailById.fulfilled, (state, action) => {
        state.statusForDetail = "succeeded";
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetailById.rejected, (state, action) => {
        state.statusForDetail = "failed";
        state.errorForDetail = action.error.message;
      });
  },
});

export const {
  filterByPrice,
  filterByBrand,
  setSearchTerm,
  addFilter,
  removeFilter,
} = productSlice.actions;

export default productSlice.reducer;
