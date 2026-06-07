// This component represents the main Home page where all products are displayed.

// Import some icons from the lucide-react library
import { PlusCircleIcon, RefreshCwIcon, PackageIcon } from "lucide-react";
// Import our custom store to access product data and functions
import { useProductStore } from "../store/useProductStore";
// Import useEffect, a React hook used to run code when the component first appears on screen
import { useEffect } from "react";
// Import the component that displays a single product
import ProductCard from "../components/ProductCard.jsx";
// Import the modal component for adding a new product
import AddProductModal from "../components/AddProductModal.jsx";

function HomePage() {
  // Grab the data and functions we need from our Zustand store
  const { products, loading, error, fetchProducts } = useProductStore();

  // useEffect runs the code inside it when the component "mounts" (first appears).
  // Here, we call fetchProducts() so the page automatically loads the products when the user visits it.
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* HEADER SECTION: Title and Buttons */}
      <div className="flex justify-between items-center mb-8">
        {/* Button to open the "Add Product" modal. It uses standard HTML dialog methods. */}
        <button className="btn btn-primary" onClick={() => document.getElementById("add_product_modal").showModal()}>
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        {/* Button to manually refresh the product list */}
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>
      
      {/* Render the invisible AddProductModal. It stays hidden until we call showModal() above. */}
      <AddProductModal />
  
      {/* If there's an error (like a rate limit), display it here */}
      {error && <div className="alert alert-error mb-4">{error}</div>} 
    
      {/* EMPTY STATE: If there are no products and we aren't currently loading, show a friendly message */}
      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}
    
      {/* LOADING STATE: Show a spinner while waiting for the backend to respond */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        /* PRODUCT GRID: Loop over the 'products' array and create a ProductCard for each one */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            // We must pass a unique 'key' to elements in a list so React can keep track of them efficiently
            <ProductCard key={product.id} product={product} /> 
          ))}
        </div>
      )}
    </main> 
  );
}

export default HomePage;