import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    getRoomId: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { getRoomId } = appSlice.actions;

export const selectRoomId = (state) => state.app.value;

export default appSlice.reducer;
