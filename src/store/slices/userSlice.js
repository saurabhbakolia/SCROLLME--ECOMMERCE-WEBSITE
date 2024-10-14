import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  name: '',
  avatar: '',
  bio: '',
  isAuthenticated: false,
  roles: [],
  token: '',
  sessionExpiry: null,
  refreshToken: '',
  isFetching: false,
  error: null,
  theme: 'light',
  lastLogin: null
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Handle login success
    loginSuccess: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.id = user.id;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.email = user.email;
      state.name = user.name;
      state.token = token;
      state.refreshToken = refreshToken;
      state.lastLogin = new Date().toISOString();
      state.isAuthenticated = user.isAuthenticated;
    },
    logOut: (state) => {
      Object.assign(state, initialState);
    },
    // Update user profile information
    updateProfile: (state, action) => {
      const { name, avatar, bio } = action.payload;
      state.name = name;
      state.avatar = avatar;
      state.bio = bio;
    },
    // Set the fetching state
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    // Set an error message
    setError: (state, action) => {
      state.error = action.payload;
    },
    changeAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { loginSuccess, logOut, updateProfile, setFetching, setError, changeAuthenticated } = userSlice.actions;

export default userSlice.reducer;
