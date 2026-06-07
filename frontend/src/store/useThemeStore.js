// This file uses a library called "Zustand" to manage global state.
// State is just data that changes over time (like the currently selected theme).
// We make it "global" so ANY component in our app can access it without passing props down through many levels.

// Import the 'create' function from zustand to build our store
import { create } from "zustand";

// Create and export the store
export const useThemeStore = create((set) => ({
  // 1. Initial State: 
  // When the app first loads, we check the browser's "localStorage" to see if the user previously saved a theme.
  // If they did, we use it. If not (the || operator), we default to the "forest" theme.
  theme: localStorage.getItem("preferred-theme") || "forest",
  
  // 2. Action: 
  // This is a function that components can call to change the theme.
  setTheme: (theme) => {
    // First, save the new theme into the browser's localStorage so we remember it for their next visit.
    localStorage.setItem("preferred-theme", theme);
    // Second, update the 'theme' state in this Zustand store, which will instantly update the UI everywhere.
    set({ theme });
  },
}));