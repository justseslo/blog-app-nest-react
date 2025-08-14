import { api } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkToken = createAsyncThunk("auth/checkToken", async () => {
  try {
    const res = await api.get("/auth/check-token");
    if (res.data.success) {
      return res.data.success;
    }
  } catch (error) {
    console.error(error);
  }
});
const initialState = {
  isLogined: null as boolean | null,
};
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.isLogined = action.payload;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.isLogined = false;
    });
  },
});
export const authReducer = authSlice.reducer;
