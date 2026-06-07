// This component displays a single product as a visually appealing card.

import { Edit2Icon, Trash2Icon } from "lucide-react";
// Link is used to navigate to the specific product's edit page
import { Link } from "react-router-dom";
// We need the deleteProduct function from the store so the user can delete it right from the card
import { useProductStore } from "../store/useProductStore";

// The component accepts a 'product' object as a "prop" (a piece of data passed from the parent component, HomePage).
function ProductCard({ product }) {
    // Grab the delete function from the Zustand store
    const { deleteProduct } = useProductStore();
    
  return (
    // The main container for the card. DaisyUI's "card" class adds nice padding and rounded corners.
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">

        {/* PRODUCT IMAGE */}
        {/* The padding-top trick (pt-[56.25%]) forces a specific aspect ratio (16:9) for the image container */}
        <figure className="relative pt-[56.25%]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="absolute top-0 w-full h-full object-cover" // object-cover ensures the image fills the space without squishing
            />
        </figure>

        {/* CARD BODY (Text and Buttons) */}
        <div className="card-body">
            {/* Display the product name */}
            <h2 className="card-title text-lg font-semibold">{product.name}</h2>
            {/* Display the product price. Number(price).toFixed(2) ensures it always shows 2 decimal places (e.g., $10.00) */}
            <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
            
            {/* CARD ACTIONS (Buttons) */}
            <div className="card-actions justify-end mt-4">
                {/* The Edit button is actually a Link that navigates to /product/5 (or whatever the ID is) */}
                <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
                    <Edit2Icon className="size-4 mr-1" />
                </Link>

                {/* The Delete button calls the deleteProduct function immediately when clicked */}
                <button 
                  className="btn btn-sm btn-error btn-outline" 
                  // Use an arrow function so it doesn't run immediately when the page loads, but ONLY when clicked.
                  onClick={() => deleteProduct(product.id)}
                >
                    <Trash2Icon className="size-4 mr-1" />
                </button>
            </div>
        </div>
    </div>
  );
}

export default ProductCard;