import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!Cookies.get("token"),
    isAdmin: Cookies.get("useradmin"),
    token: Cookies.get("token"),
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.isAdmin = Cookies.get("useradmin");
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      Cookies.remove("token"); // Supprimer le token du cookie lors de la déconnexion
      Cookies.remove("useradmin");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
