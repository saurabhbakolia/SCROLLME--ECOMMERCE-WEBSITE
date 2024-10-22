import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserSignInAPI } from '../../services/userAPI/signInAPI';

const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  name: '',
  isAuthenticated: false,
  roles: [],
  isFetching: false,
  error: null,
};

// Thunk for userSignIn
export const userSignIn = createAsyncThunk('user/signIn', async (loginData, { rejectWithValue }) => {
  try {
    const response = await UserSignInAPI(loginData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const UserSlice = createSlice({
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
      state.id = null;
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.name = '';
      state.roles = [];
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      state.lastLogin = null;
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        const payload = action.payload;
        state.id = payload.user.id;
        const firstName = payload.user.firstName;
        const lastName = payload.user.lastName;
        state.firstName = firstName;
        state.lastName = lastName;
        state.email = payload.user.email;
        state.name = `${firstName} ${lastName}`;
        state.roles = payload.user.roles;
        state.isAuthenticated = true;
        state.isFetching = false;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isFetching = false;
        state.isAuthenticated = false;
        state.id = null;
        state.firstName = '';
        state.lastName = '';
        state.email = '';
        state.name = '';
        state.roles = [];
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logOut, updateProfile, setFetching, setError, changeAuthenticated } = UserSlice.actions;

export default UserSlice.reducer;
