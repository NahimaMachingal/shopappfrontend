import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;
// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken; // Ensure auth slice has the token
      const response = await axios.get(`${BASE_URL}shop/users/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching users
export const fetchProducts = createAsyncThunk(
    'users/fetchProducts',
    async (_, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken; // Ensure auth slice has the token
        const response = await axios.get(`${BASE_URL}shop/products/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productData, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken; // Ensure auth slice has the token
        const response = await axios.post(`${BASE_URL}shop/products/add/`, productData, {
          headers: {
            
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  // Fetch all orders for admin
export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth.accessToken || localStorage.getItem("accessToken");
      if (!accessToken) return rejectWithValue({ detail: "Authentication required" });

      const response = await axios.get(`${BASE_URL}shop/admin/orders/`, {
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

// Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth.accessToken || localStorage.getItem("accessToken");
      if (!accessToken) return rejectWithValue({ detail: "Authentication required" });

      const response = await axios.patch(
        `${BASE_URL}shop/admin/orders/${orderId}/update/`,
        { status },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update order status");
    }
  }
);



const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    products: [],
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload); // Add the new product to the state
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAdminOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.detail || "Failed to fetch orders";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((order) => order.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      });
  },
});

export default userSlice.reducer;
