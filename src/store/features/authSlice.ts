import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  userType: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  questionnaireCompleted: boolean;
}

const initialState: AuthState = {
  user: null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("token") : "testtest",
  isAuthenticated: true,
  questionnaireCompleted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    completeQuestionnaire: (state) => {
      state.questionnaireCompleted = true;
      if (typeof window !== "undefined") {
        document.cookie = "questionnaireCompleted=true; path=/";
      }
    },
  },
});

export const { setCredentials, logout, completeQuestionnaire } =
  authSlice.actions;
export default authSlice.reducer;
