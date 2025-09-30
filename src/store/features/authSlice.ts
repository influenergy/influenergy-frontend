import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id?: string;
  fullName?: string;
  email?: string;
  userType?: string;
  profileIcon?: string;
  isProfileCompleted: boolean;
  isEmailVerified: boolean;
  isAccountVerified: boolean;
  companyName?: string;
  companyWebsite?: string;
  isPasswordSet?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  questionnaireCompleted: boolean;
  userType: string | null;
  pendingCollaborationCount: number;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  questionnaireCompleted: false,
  userType: null,
  pendingCollaborationCount: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setPendingCollaborationCount: (state, action: PayloadAction<number>) => {
      state.pendingCollaborationCount = action.payload;
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

export const { setCredentials, logout, completeQuestionnaire, setUserType, setPendingCollaborationCount } =
  authSlice.actions;
export default authSlice.reducer;
