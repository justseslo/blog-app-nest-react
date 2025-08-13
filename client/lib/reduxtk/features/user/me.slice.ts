import { api } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMe = createAsyncThunk("user/getMe", async () => {
  try {
    const res = await api.get("/auth/me");
    if (res.data.success) {
      return res.data.user;
    }
  } catch (error) {
    console.error(error);
  }
});
const initialState = {
  user: {},
};
const meSlice = createSlice({
  initialState,
  name: "me",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export const meReducer = meSlice.reducer
