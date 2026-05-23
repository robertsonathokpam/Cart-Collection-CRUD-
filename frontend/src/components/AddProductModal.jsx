import { useProductStore } from "../store/useProductStore";
import { Package2Icon, PlusCircleIcon } from "lucide-react"; 
import { IndianRupee } from "lucide-react";
import { ImageIcon } from "lucide-react";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore(); // Grab 'loading' from the store
  
  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/*close button*/}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            X
          </button>
        </form>
        {/*modal header*/}
        <h3 className="font-bold text-lg mb-4">Add New Product</h3>

        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* PRODUCT NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Product Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            
            {/* PRODUCT PRICE */}
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
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT IMAGE URL */}
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

          {/* ADD THESE MODAL ACTIONS: This gives you the submit button! */}
          {/* ADD THESE MODAL ACTIONS: This gives you the submit button! */}
          <div className="modal-action">
            {/* FIX: Removed the nested <form> and changed to a normal button */}
            <button 
              type="button" 
              className="btn btn-ghost"
              onClick={() => {
                document.getElementById("add_product_modal").close();
              }}
            >
              Cancel
            </button>
            
            {/* The actual submit button */}
            <button 
                type="submit" 
                className="btn btn-primary min-w-[120px]" 
                disabled={!formData.name || !formData.price || !formData.image || loading}
            >
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
      
      {/* This allows you to close the modal by clicking outside of it */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>

      
    </dialog>
  );
} 

export default AddProductModal;