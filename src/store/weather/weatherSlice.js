import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products: [],
    loading: false,
    error: null,
    total: 0,
    skip: 0,
    limit: 12,
    sortPrice: null,  // Используйте null вместо ''
    sortName: null,  // Используйте null вместо ''
    sortQuantity: null,  // Используйте null вместо ''
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ skip }, { getState}) => {
        const { limit, sortPrice, sortName, sortQuantity } = getState().productSlice;
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        if (sortPrice) {
            url += `&sortBy=price&order=${sortPrice}`;
        } else if (sortName) {
            url += `&sortBy=title&order=${sortName}`;
        } else if (sortQuantity) {
            url += `&sortBy=stock&order=${sortQuantity}`;
        }
        try{

        const response = await axios.get(url);
        return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
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
        },
        setSortPrice: (state, action) => {
            state.sortPrice = action.payload;
            state.sortName = null;  // Обнуляйте другие сортировки
            state.sortQuantity = null;  // Обнуляйте другие сортировки
        },
        setSortName: (state, action) => {
            state.sortName = action.payload;
            state.sortPrice = null;  // Обнуляйте другие сортировки
            state.sortQuantity = null;  // Обнуляйте другие сортировки
        },
        setSortQuantity: (state, action) => {
            state.sortQuantity = action.payload;
            state.sortPrice = null;  // Обнуляйте другие сортировки
            state.sortName = null;  // Обнуляйте другие сортировки
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
                if (action.payload && action.payload.products) {
                    state.products = action.payload.products;
                    state.total = action.payload.total;
                    state.error = null;
                } else {
                    console.error("Invalid product data received");
                    state.error = "Invalid product data received";
                    state.products = [];
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Используйте action.error.message для получения сообщения об ошибке
            });
    },
});

export const { setSkip, setLimit, setSortPrice, setSortName, setSortQuantity } = productSlice.actions;

export const selectProducts = (state) => state.productSlice.products;
export const selectLoading = (state) => state.productSlice.loading;
export const selectError = (state) => state.productSlice.error;
export const selectTotal = (state) => state.productSlice.total;
export const selectLimit = (state) => state.productSlice.limit;
export const selectSortPrice = (state) => state.productSlice.sortPrice;
export const selectSortName = (state) => state.productSlice.sortName;
export const selectSortQuantity = (state) => state.productSlice.sortQuantity;

export default productSlice.reducer;

