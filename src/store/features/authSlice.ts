import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id?: string;
  fullName?: string;
  email?: string;
  userType?: string;
  image?:string;
};

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
    setCredentials: (
      state,
      action: PayloadAction<{ user: User;}>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
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
