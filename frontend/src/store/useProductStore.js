// This file uses Zustand to manage the global state specifically for products.
// It handles fetching products from the backend, adding new ones, updating, and deleting.
// It also manages "loading" states (so we can show a spinner) and "error" states (so we can show error messages).

import { create } from "zustand";
// Axios is a popular library for making HTTP requests (like GET, POST, PUT, DELETE) to our backend API
import axios from "axios";
// React Hot Toast is used to show little pop-up notifications
import { toast } from "react-hot-toast";

// BASE_URL determination:
// import.meta.env.MODE tells us if we are running the app locally ("development") or if it's deployed ("production").
// In development, the React frontend runs on port 5173, but the Express backend runs on port 3000. So we need to point to localhost:3000.
// In production, the frontend and backend are usually served from the exact same URL, so we can leave it empty ("").
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // --- INITIAL STATE ---
  products: [],          // The list of all products
  loading: false,        // Is the app currently waiting for a response from the server?
  error: null,           // Did an error occur during the last request?
  currentProduct: null,  // The specific product being viewed or edited on the ProductPage
  
  // State for the "Add/Edit Product" form
  formData: {
    name: "",
    price: "",
    image: "",
  },

  // --- ACTIONS (Functions to change the state) ---

  // Updates the formData state as the user types into the input fields.
  setFormData: (formData) => set({ formData }), 

  // Clears the form back to empty strings (used after a product is successfully added or when the form is closed)
  resetFormData: () => set({ formData: { name: "", price: "", image: "" } }), 

  // 1. ADD PRODUCT
  addProduct: async (e) => {
    // Prevent the default browser behavior of refreshing the page when a form is submitted
    e.preventDefault();
    // Turn on the loading spinner
    set({ loading: true });

    try {
      // Get the current form data from the store
      const { formData } = get();
      // Make a POST request to our backend API to save the new product
      await axios.post(`${BASE_URL}/api/products`, formData);
      // If successful, fetch the updated list of all products so the new one appears on screen
      await get().fetchProducts();
      // Clear the form
      get().resetFormData();
      // Show a success notification
      toast.success("Product added successfully");
      // Close the modal (the popup window where the form is)
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Failed to add product", error);
      // Show an error notification
      toast.error("Failed to add product. Please try again.");
    } finally {
      // Turn off the loading spinner, regardless of whether it succeeded or failed
      set({ loading: false });
    }
  },

  // 2. FETCH ALL PRODUCTS
  fetchProducts: async () => {
    set({ loading: true });
    try {
      // Make a GET request to the backend to get all products
      const response = await axios.get(`${BASE_URL}/api/products`);
      // Update the 'products' state with the data received from the backend
      set({ products: response.data.data, error: null });
    } catch (err) {
      // If the backend responds with status 429, it means we hit the Arcjet rate limit
      if (err.response?.status === 429) {
        set({ error: "Rate limit exceeded", products: [] });
      } else {
        set({
          error: "Failed to fetch products. Please try again.",
          products: [],
        });
      }
    } finally {
      set({ loading: false });
    }
  },

  // 3. DELETE PRODUCT
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      // Make a DELETE request to the backend, specifying the ID of the product to delete
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      // Remove the deleted product from our local 'products' array without having to fetch the whole list again
      set((prev) => ({ products: prev.products.filter((p) => p.id !== id) }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Failed to delete product", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

  // 4. FETCH A SINGLE PRODUCT (Used on the ProductPage)
  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      // Make a GET request for one specific product
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({ 
        currentProduct: response.data.data, // Set it as the current product being viewed
        formData: response.data.data,       // Also pre-fill the edit form with this product's data!
        error: null 
      });
    } catch (error) {
      console.log("Failed to fetch product", error);
      set({ error: "Failed to fetch product. Please try again.", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  // 5. UPDATE PRODUCT
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      // Get the updated form data from the store
      const { formData } = get();
      // Make a PUT request to the backend to update the product in the database
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      // Update the currentProduct state with the new data from the backend
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");
    } catch (error) {
      console.log("Failed to update product", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      set({ loading: false });
    }
  }
}));

export default useProductStore;
