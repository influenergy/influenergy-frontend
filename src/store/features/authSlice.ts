import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id?: string;
  fullName?: string;
  email?: string;
  userType?: string;
  profileIcon?: string;
  isProfileCompleted: boolean;
  isEmailVerified: boolean;
  companyName?: string;
  companyWebsite?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  questionnaireCompleted: boolean;
  userType: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  questionnaireCompleted: false,
  userType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    completeQuestionnaire: (state) => {
      state.questionnaireCompleted = true;
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
      if (state.user) {
        state.user.userType = action.payload;
      }
    },
  },
});

export const { setCredentials, logout, completeQuestionnaire, setUserType } =
  authSlice.actions;
export default authSlice.reducer;
