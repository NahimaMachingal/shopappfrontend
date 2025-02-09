// src/features/customer/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { getState, rejectWithValue }) => {
        try {
            const accessToken = getState().auth.accessToken || localStorage.getItem("accessToken");
            if (!accessToken) return rejectWithValue({ detail: "Authentication required" });

            const response = await axios.get(`${BASE_URL}orders/`, {
                headers: { Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch orders");
        }
    }
);

// ✅ Submit Rating Async Thunk
export const submitRating = createAsyncThunk(
    'orders/submitRating',
    async ({ productId, rating }, { getState, rejectWithValue }) => {
        try {
            const accessToken = getState().auth.accessToken || localStorage.getItem("accessToken");
            if (!accessToken) return rejectWithValue({ detail: "Authentication required" });

            const response = await axios.post(
                `${BASE_URL}rating/submit/`,
                { product: productId, rating: parseInt(rating) },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to submit rating");
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: { orders: [], status: 'idle', error: null, ratingStatus: 'idle', ratingError: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrders.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders = action.payload;
            state.error = null;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.detail || 'Failed to fetch orders';
        })
        .addCase(submitRating.pending, (state) => {
            state.ratingStatus = 'loading';
            state.ratingError = null;
        })
        .addCase(submitRating.fulfilled, (state, action) => {
            state.ratingStatus = 'succeeded';
            state.ratingError = null;
        })
        .addCase(submitRating.rejected, (state, action) => {
            state.ratingStatus = 'failed';
            state.ratingError = action.payload?.detail || 'Failed to submit rating';
        });
    },
});

export default orderSlice.reducer;
