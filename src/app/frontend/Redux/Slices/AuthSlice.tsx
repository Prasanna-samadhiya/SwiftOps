import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  details: {name:string;email:string};
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  details: {name:"",email:""},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{name:string;email:string}>) => {
      state.details = action.payload;
      state.isAuthenticated = true;
      console.log(state.details,state.isAuthenticated);
    },
    logout: (state) => {
      state.details = {name:"",email:""};
      state.isAuthenticated = false;
      console.log(state.details,state.isAuthenticated);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
