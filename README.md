# Delivrry Admin Dashboard

A comprehensive admin dashboard for the Delivrry platform with dynamic data management using JSON Server and Redux Toolkit.

## Features

- **Dynamic Data Management**: Full CRUD operations with JSON Server backend
- **Redux Toolkit Integration**: Centralized state management with async thunks
- **Real-time Updates**: Automatic UI updates when data changes
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Proper loading indicators for better UX
- **Responsive Design**: Works seamlessly across all device sizes

## Tech Stack

- **Frontend**: React 19, Redux Toolkit, Tailwind CSS
- **Backend**: JSON Server (for development)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: ECharts for React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

#### Option 1: Run both frontend and API server together
```bash
npm run dev:full
```

#### Option 2: Run separately
```bash
# Terminal 1 - Frontend (port 5173)
npm run dev

# Terminal 2 - API Server (port 3001)
npm run dev:api
```

The application will be available at:
- Frontend: http://localhost:5173
- API Server: http://localhost:3001

## API Endpoints

The JSON Server provides the following REST endpoints:

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Vendors
- `GET /vendors` - Get all vendors
- `GET /vendors/:id` - Get vendor by ID
- `POST /vendors` - Create new vendor
- `PUT /vendors/:id` - Update vendor
- `DELETE /vendors/:id` - Delete vendor

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

### Delivery Partners
- `GET /deliveryPartners` - Get all delivery partners
- `GET /deliveryPartners/:id` - Get delivery partner by ID
- `POST /deliveryPartners` - Create new delivery partner
- `PUT /deliveryPartners/:id` - Update delivery partner
- `DELETE /deliveryPartners/:id` - Delete delivery partner

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── ConfirmDialog.jsx
│   ├── users/            # User-specific components
│   │   └── UsersList.jsx
│   └── ...               # Other feature components
├── hooks/                # Custom React hooks
│   ├── useAppDispatch.js
│   └── useAppSelector.js
├── services/             # API services
│   └── api.js
├── store/                # Redux store configuration
│   ├── index.js
│   └── slices/           # Redux slices
│       ├── usersSlice.js
│       ├── vendorsSlice.js
│       ├── ordersSlice.js
│       ├── deliveryPartnersSlice.js
│       └── uiSlice.js
└── ...
```

## Redux Store Structure

The application uses Redux Toolkit with the following slices:

- **usersSlice**: Manages user data and operations
- **vendorsSlice**: Manages vendor data and operations
- **ordersSlice**: Manages order data and operations
- **deliveryPartnersSlice**: Manages delivery partner data and operations
- **uiSlice**: Manages UI state (modals, notifications, filters)

## Key Features Implemented

### 1. Dynamic Data Fetching
- Automatic data loading on component mount
- Refresh functionality to reload data
- Real-time updates when data changes

### 2. CRUD Operations
- Create: Add new records with form validation
- Read: Display data in responsive tables
- Update: Edit existing records with pre-filled forms
- Delete: Remove records with confirmation dialogs

### 3. Error Handling
- Network error handling with user-friendly messages
- Loading states during API operations
- Success notifications for completed actions

### 4. Search and Filtering
- Real-time search across multiple fields
- Filter reset functionality
- Responsive design for mobile devices

### 5. Production-Ready Features
- TypeScript-ready structure
- Proper error boundaries
- Loading states and spinners
- Confirmation dialogs for destructive actions
- Notification system for user feedback

## Usage Example

The `UsersList` component demonstrates all the key features:

```jsx
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../store/slices/usersSlice';

// Component automatically fetches data on mount
useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);

// All CRUD operations are handled with proper error handling
const handleCreateUser = async (userData) => {
  try {
    await dispatch(createUser(userData)).unwrap();
    // Success notification
  } catch (error) {
    // Error handling
  }
};
```

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.