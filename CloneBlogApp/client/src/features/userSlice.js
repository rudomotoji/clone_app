import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching:false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login:(state,action)=>{
      state.user=action.payload
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    updateSuccess:(state,action)=>{
      state.user=action.payload
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout:(state)=>{
      localStorage.removeItem('user')
      state.user=null
    }
  },
});

export const { login, logout, updateSuccess } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
