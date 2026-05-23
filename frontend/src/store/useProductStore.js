import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

//base url will be dynamic depending on the environment we are in development or production in development we will use localhost:3000 and in production we will use the same url as the frontend is being served from which is determined by import.meta.env.MODE
const BASE_URL = import.meta.env.MODE=="development"?"http://localhost:3000":"";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  //form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }), // this will update the formData state with the new values provided by the form inputs for example when user types in the name input field we will call setFormData({ ...get().formData, name: e.target.value }) to update the name property of formData while keeping the other properties unchanged

  resetFormData: () => set({ formData: { name: "", price: "", image: "" } }), //and this will reset the formData to its initial state after a product is added successfully or when user cancels the form for example when user clicks on cancel button we will call resetFormData() to clear the form inputs and set formData back to its initial empty values

  
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetFormData();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Failed to add product", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
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

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({ products: prev.products.filter((p) => p.id !== id) }));
    } catch (error) {
      console.log("Failed to delete product", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({ 
        currentProduct: response.data.data,
        formData: response.data.data ,
        error: null });

    } catch (error) {
      console.log("Failed to fetch product", error);
      set({ error: "Failed to fetch product. Please try again.", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } =get();
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
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
