// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCart, AddProductToCart, RemoveFromCart } from "../services/cartServices";

export const addItemToCart = createAsyncThunk("cart/addItemToCart", async ({ productId, quantity }, thunkAPI) => {
  try {
    await AddProductToCart(productId, quantity);
    // Rafraîchir l'état du panier et retourner directement le résultat
    const refreshedCart = await thunkAPI.dispatch(fetchCart()).unwrap();
    return refreshedCart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de l'ajout du produit");
  }
});

export const removeItemFromCart = createAsyncThunk("cart/removeItemFromCart", async (productId, thunkAPI) => {
  try {
    await RemoveFromCart(productId);
    // Rafraîchir l'état du panier et retourner directement le résultat
    const refreshedCart = await thunkAPI.dispatch(fetchCart()).unwrap();
    return refreshedCart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression du produit");
  }
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const response = await GetCart();
    return response.data.products || [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de la récupération du panier");
  }
});



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(removeItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
