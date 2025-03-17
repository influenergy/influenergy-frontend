import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { postApi } from "@/services/postServices";

// Define types
interface Requirement {
  location: string;
  minFollowers: string;
  minEngagement: string;
}

interface Campaign {
  _id: string;
  title: string;
  description: string;
  offerDescription: string;
  requirement: Requirement;
  createdAt?: string;
  updatedAt?: string;
}

interface PostState {
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PostState = {
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCampaigns = createAsyncThunk(
  "post/fetchCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApi.getCampaigns();
      return response.campaigns;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCampaignById = createAsyncThunk(
  "post/fetchCampaignById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await postApi.getCampaignById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCampaign = createAsyncThunk(
  "post/updateCampaign",
  async ({ id, data }: { id: string; data: Partial<Campaign> }, { rejectWithValue, dispatch }) => {
    try {
      const response = await postApi.updateCampaign(id, data);
      // Refresh the campaigns list after update
      dispatch(fetchCampaigns());
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create post slice
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearCurrentCampaign: (state) => {
      state.currentCampaign = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchCampaigns
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action: PayloadAction<Campaign[]>) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchCampaignById
      .addCase(fetchCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignById.fulfilled, (state, action: PayloadAction<Campaign>) => {
        state.loading = false;
        state.currentCampaign = action.payload;
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateCampaign
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampaign.fulfilled, (state, action: PayloadAction<Campaign>) => {
        state.loading = false;
        state.currentCampaign = action.payload;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentCampaign } = postSlice.actions;
export default postSlice.reducer;
