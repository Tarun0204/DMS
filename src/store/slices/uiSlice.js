import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  modals: {
    userForm: { isOpen: false, mode: 'create', data: null },
    vendorForm: { isOpen: false, mode: 'create', data: null },
    orderForm: { isOpen: false, mode: 'create', data: null },
    deliveryPartnerForm: { isOpen: false, mode: 'create', data: null },
    confirmDelete: { isOpen: false, type: null, id: null, name: null },
  },
  filters: {
    users: { search: '', status: 'all', region: 'all' },
    vendors: { search: '', status: 'all', category: 'all' },
    orders: { search: '', status: 'all', dateRange: 'all' },
    deliveryPartners: { search: '', status: 'all', vehicle: 'all' },
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.notifications.unshift(notification);
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Modals
    openModal: (state, action) => {
      const { modalType, mode = 'create', data = null } = action.payload;
      if (state.modals[modalType]) {
        state.modals[modalType] = { isOpen: true, mode, data };
      }
    },
    
    closeModal: (state, action) => {
      const modalType = action.payload;
      if (state.modals[modalType]) {
        state.modals[modalType] = { isOpen: false, mode: 'create', data: null };
      }
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modalType => {
        state.modals[modalType] = { isOpen: false, mode: 'create', data: null };
      });
    },

    // Filters
    setFilter: (state, action) => {
      const { section, filterType, value } = action.payload;
      if (state.filters[section] && state.filters[section].hasOwnProperty(filterType)) {
        state.filters[section][filterType] = value;
      }
    },
    
    clearFilters: (state, action) => {
      const section = action.payload;
      if (state.filters[section]) {
        Object.keys(state.filters[section]).forEach(key => {
          if (key === 'search') {
            state.filters[section][key] = '';
          } else {
            state.filters[section][key] = 'all';
          }
        });
      }
    },
    
    clearAllFilters: (state) => {
      Object.keys(state.filters).forEach(section => {
        Object.keys(state.filters[section]).forEach(key => {
          if (key === 'search') {
            state.filters[section][key] = '';
          } else {
            state.filters[section][key] = 'all';
          }
        });
      });
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setFilter,
  clearFilters,
  clearAllFilters,
} = uiSlice.actions;

// Selectors
export const selectNotifications = (state) => state.ui.notifications;
export const selectModal = (state, modalType) => state.ui.modals[modalType];
export const selectFilters = (state, section) => state.ui.filters[section];

export default uiSlice.reducer;