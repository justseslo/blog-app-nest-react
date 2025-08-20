import { api } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface IAuthState {
  isLogined: boolean;
  isAuthChecked: boolean;
}
const initialState: IAuthState = {
  isLogined: false,
  isAuthChecked: false,
};
export const checkToken = createAsyncThunk("auth/checkToken", async () => {
  try {
    const res = await api.get("/auth/check-token");
    return true;
  } catch (error) {
    throw error;
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.isLogined = true;
      state.isAuthChecked = true;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.isLogined = false;
      state.isAuthChecked = true;
    });
  },
});
