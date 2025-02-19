import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  userType?: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  questionnaireCompleted: boolean;
  userType: string | null;
}

const initialState: AuthState = {
  user: {},
  token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
  isAuthenticated: true,
  questionnaireCompleted: false,
  userType:
    typeof window !== "undefined" ? localStorage.getItem("userType") : null,
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
        console.log("window");
        localStorage.removeItem("token");
        document.cookie.split(";").forEach((cookie) => {
          const name = cookie.split("=")[0].trim();
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      }
    },
    completeQuestionnaire: (state) => {
      state.questionnaireCompleted = true;
      if (typeof window !== "undefined") {
        document.cookie = "questionnaireCompleted=true; path=/";
      }
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userType", action.payload);
      }
      if (state.user) {
        state.user.userType = action.payload;
      }
    },
  },
});

export const { setCredentials, logout, completeQuestionnaire, setUserType } =
  authSlice.actions;
export default authSlice.reducer;
