/**
 * This file sets up the Redux store for the application.
 * It imports the necessary modules and combines the reducers.
 */

import { configureStore } from "@reduxjs/toolkit"; // Import the configureStore function from Redux Toolkit
import boardsSlice from "./boardsSlice"; // Import the boards slice reducer

// Configure the Redux store
const store = configureStore({
  reducer: {
    // Combine the reducers
    boards: boardsSlice.reducer, // Add the boards slice reducer
  },
});

export default store; // Export the configured store
