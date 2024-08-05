import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCarts: (state, action) => {
      state.cartItems = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { setLogin, setLogout, setRole, setCarts, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;
