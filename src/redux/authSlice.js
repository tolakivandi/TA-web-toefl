import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null, // Ambil token jika ada
  user: null,
};

const authSlice = createSlice({
  name: "auth", 
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.token;
      state.user = action.payload;
      localStorage.setItem("token", action.token); // Simpan token
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token"); // Hapus token saat logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
