// src/features/customer/customerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { getState, rejectWithValue }) => {
      try {
        const accessToken = getState().auth.accessToken || localStorage.getItem("accessToken");
  
        if (!accessToken) {
          return rejectWithValue("User not authenticated");
        }
  
        const response = await axios.get(`${BASE_URL}products/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch products");
      }
    }
  );
  
  export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (cartData, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
  
        if (!accessToken) {
          console.log("No access token found.");
          return rejectWithValue({ detail: 'Authentication required' });
        }
  
        console.log("Sending request to backend with:", {
          product: cartData.product_id,
          quantity: cartData.quantity,
        });
  
        const response = await axios.post(
          `${BASE_URL}cart/add/`,
          {
            product: cartData.product_id,
            quantity: cartData.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        console.log("Cart item added:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error adding to cart:", error.response?.data);
        return rejectWithValue(error.response?.data);
      }
    }
  );
  // Update Cart Item Quantity
export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
  
      if (!accessToken) return rejectWithValue({ detail: 'Authentication required' });
  
      const response = await axios.patch(
        `${BASE_URL}cart/update/`,
        { product: productId, quantity },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  });
  
  // Remove Cart Item
export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (productId, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;
    if (!accessToken) return rejectWithValue({ detail: 'Authentication required' });

    await axios.delete(`${BASE_URL}cart/remove/${productId}/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return productId; // Return the product ID to remove it from Redux store
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const submitAddress = createAsyncThunk(
    'customer/submitAddress',
    async (addressData, { getState, rejectWithValue }) => {
      try {
        const accessToken = getState().auth.accessToken || localStorage.getItem("accessToken");
        if (!accessToken) return rejectWithValue({ detail: 'Authentication required' });

        const response = await axios.post(
            `${BASE_URL}address/add/`,
            addressData,  
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to submit address");
      }
    }
  );


  export const submitOrder = createAsyncThunk(
    "customer/submitOrder",
    async (orderData, { getState, rejectWithValue }) => {
        try {
            const accessToken = getState().auth.accessToken || localStorage.getItem("accessToken");
            if (!accessToken) return rejectWithValue({ detail: "Authentication required" });

            const response = await axios.post(
                `${BASE_URL}order/submit/`,
                orderData,
                { headers: { Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
             } }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to submit order");
        }
    }
);
  
  export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
  
        if (!accessToken) {
          return rejectWithValue({ detail: 'Authentication required' });
        }
  
        const response = await axios.get(`${BASE_URL}cart/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );

  
  

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    products: [],
    address:null,
    cart:[],
    order:null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.cart = state.cart.map(item => item.product === updatedItem.product ? updatedItem : item);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter(item => item.product !== action.payload);
      })
      .addCase(submitAddress.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;