import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products: [],
    loading: false,
    error: null,
    total: 194,
    skip: 0, 
    limit: 12,
    sortPrice: null,
    sortName: null,
    sortQuantity: null,
};
export const num = Math.ceil(initialState.total / initialState.limit)

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ skip }, { getState }) => {
        const { limit, sortPrice, sortName, sortQuantity } = getState().productSlice;
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        if (sortPrice) {
            url += `&sortBy=price&order=${sortPrice}`; // Corrected syntax and used template literals
        } else if (sortName) {
            url += `&sortBy=title&order=${sortName}`; // Corrected syntax and used template literals
        } else if (sortQuantity) {
            url += `&sortBy=stock&order=${sortQuantity}`; // Corrected syntax and used template literals
        }

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }
);

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setSkip: (state, action) => {
            state.skip = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
            state.skip = 0; // Reset skip when limit changes for consistent pagination
        },
        setSortPrice: (state, action) => {
            state.sortPrice = action.payload;
            state.sortName = null;
            state.sortQuantity = null;
            state.skip = 0; // Reset skip when sort changes
        },
        setSortName: (state, action) => {
            state.sortName = action.payload;
            state.sortPrice = null;
            state.sortQuantity = null;
            state.skip = 0; // Reset skip when sort changes
        },
        setSortQuantity: (state, action) => {
            state.sortQuantity = action.payload;
            state.sortPrice = null;
            state.sortName = null;
            state.skip = 0; // Reset skip when sort changes
        },
        clearProducts: (state) => { // Add a clearProducts reducer
            state.products = [];
            state.skip = 0; // Reset skip as well
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload.products !== undefined && action.payload.total !== undefined) { // Check for total as well
                    state.products = action.payload.products;
                    state.total = action.payload.total;
                    state.error = null;
                } else {
                    console.error("Invalid product data received", action.payload); // Log the payload
                    state.error = "Invalid product data received";
                    state.products = [];
                    state.total = 0; // Reset total as well
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSkip, setLimit, setSortPrice, setSortName, setSortQuantity, clearProducts } = productSlice.actions;

export const selectProducts = (state) => state.productSlice.products;
export const selectLoading = (state) => state.productSlice.loading;
export const selectError = (state) => state.productSlice.error;
export const selectTotal = (state) => state.productSlice.total;
export const selectSkip = (state) => state.productSlice.skip; // Add selector for skip
export const selectLimit = (state) => state.productSlice.limit;
export const selectSortPrice = (state) => state.productSlice.sortPrice;
export const selectSortName = (state) => state.productSlice.sortName;
export const selectSortQuantity = (state) => state.productSlice.sortQuantity;

export default productSlice.reducer;
