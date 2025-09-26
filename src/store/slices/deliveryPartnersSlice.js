import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deliveryPartnersAPI } from '../../services/api';

// Async thunks for CRUD operations
export const fetchDeliveryPartners = createAsyncThunk(
  'deliveryPartners/fetchDeliveryPartners',
  async (_, { rejectWithValue }) => {
    try {
      const partners = await deliveryPartnersAPI.getAll();
      return partners;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeliveryPartnerById = createAsyncThunk(
  'deliveryPartners/fetchDeliveryPartnerById',
  async (id, { rejectWithValue }) => {
    try {
      const partner = await deliveryPartnersAPI.getById(id);
      return partner;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDeliveryPartner = createAsyncThunk(
  'deliveryPartners/createDeliveryPartner',
  async (partnerData, { rejectWithValue }) => {
    try {
      const newPartner = await deliveryPartnersAPI.create(partnerData);
      return newPartner;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDeliveryPartner = createAsyncThunk(
  'deliveryPartners/updateDeliveryPartner',
  async ({ id, partnerData }, { rejectWithValue }) => {
    try {
      const updatedPartner = await deliveryPartnersAPI.update(id, partnerData);
      return updatedPartner;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDeliveryPartner = createAsyncThunk(
  'deliveryPartners/deleteDeliveryPartner',
  async (id, { rejectWithValue }) => {
    try {
      await deliveryPartnersAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  items: [],
  selectedPartner: null,
  loading: false,
  error: null,
  lastFetch: null,
};

// Delivery Partners slice
const deliveryPartnersSlice = createSlice({
  name: 'deliveryPartners',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedPartner: (state) => {
      state.selectedPartner = null;
    },
    setSelectedPartner: (state, action) => {
      state.selectedPartner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all delivery partners
      .addCase(fetchDeliveryPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(fetchDeliveryPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch delivery partner by ID
      .addCase(fetchDeliveryPartnerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryPartnerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPartner = action.payload;
      })
      .addCase(fetchDeliveryPartnerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create delivery partner
      .addCase(createDeliveryPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeliveryPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createDeliveryPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update delivery partner
      .addCase(updateDeliveryPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeliveryPartner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(partner => partner.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedPartner?.id === action.payload.id) {
          state.selectedPartner = action.payload;
        }
      })
      .addCase(updateDeliveryPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete delivery partner
      .addCase(deleteDeliveryPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeliveryPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(partner => partner.id !== action.payload);
        if (state.selectedPartner?.id === action.payload) {
          state.selectedPartner = null;
        }
      })
      .addCase(deleteDeliveryPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedPartner, setSelectedPartner } = deliveryPartnersSlice.actions;

// Selectors
export const selectAllDeliveryPartners = (state) => state.deliveryPartners.items;
export const selectDeliveryPartnersLoading = (state) => state.deliveryPartners.loading;
export const selectDeliveryPartnersError = (state) => state.deliveryPartners.error;
export const selectSelectedDeliveryPartner = (state) => state.deliveryPartners.selectedPartner;
export const selectDeliveryPartnerById = (state, partnerId) => 
  state.deliveryPartners.items.find(partner => partner.id === partnerId);

export default deliveryPartnersSlice.reducer;