// This component displays a pop-up window (modal) with a form to add a new product.

// Import our custom store to get the addProduct function, form data, and loading state
import { useProductStore } from "../store/useProductStore";
// Import icons for the input fields and buttons
import { Package2Icon, PlusCircleIcon, IndianRupee, ImageIcon } from "lucide-react"; 

function AddProductModal() {
  // Extract what we need from the Zustand store
  const { addProduct, formData, setFormData, loading } = useProductStore(); 
  
  return (
    // The <dialog> tag is a standard HTML element used for popups. 
    // DaisyUI styles it beautifully when we give it the "modal" class.
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <form method="dialog">
          {/* If there is a button inside a form with method="dialog", clicking it closes the dialog */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            X
          </button>
        </form>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-lg mb-4">Add New Product</h3>

        {/* THE MAIN FORM */}
        {/* When the user clicks the "Add Product" button, this triggers the addProduct function from our store */}
        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            
            {/* PRODUCT NAME INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Product Name
                </span>
              </label>
              <div className="relative">
                {/* Icon inside the input field */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                {/* The actual input field */}
                <input
                  type="text"
                  placeholder="Enter product name"
                  // 'pl-10' adds padding to the left so the text doesn't overlap the icon
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  // When the user types, update the 'name' property in the store's formData
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            
            {/* PRODUCT PRICE INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <IndianRupee className="size-5" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01" // Allows decimals (e.g., 10.99)
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT IMAGE URL INPUT */}
             <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Image URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* MODAL ACTIONS (Buttons at the bottom) */}
          <div className="modal-action">
            {/* Cancel Button */}
            <button 
              type="button" // type="button" means it won't submit the form
              className="btn btn-ghost"
              onClick={() => {
                // Manually close the dialog using standard JavaScript
                document.getElementById("add_product_modal").close();
              }}
            >
              Cancel
            </button>
            
            {/* Submit Button */}
            <button 
                type="submit" // type="submit" triggers the form's onSubmit event (which calls addProduct)
                className="btn btn-primary min-w-[120px]" 
                // Disable the button if any field is missing OR if we are currently loading
                disabled={!formData.name || !formData.price || !formData.image || loading}
            >
              {/* Show a spinner if loading, otherwise show the text */}
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
          
        </form>
      </div>
      
      {/* This invisible backdrop allows the user to close the modal simply by clicking outside of the white box */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      
    </dialog>
  );
} 

export default AddProductModal;