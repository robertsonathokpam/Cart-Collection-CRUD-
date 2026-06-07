// This component displays the details of a single product and provides a form to edit or delete it.

import { useProductStore } from "../store/useProductStore";
// useNavigate allows us to programmatically change the URL (e.g., go back to the home page)
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// useParams allows us to read dynamic parts of the URL. If the URL is "/product/5", useParams gives us { id: '5' }
import { useParams } from "react-router-dom";
// Icons
import { ArrowLeftIcon, Trash2Icon, SaveIcon } from "lucide-react";

function ProductPage() {
  // Grab state and actions from the store
  const {
    currentProduct,
    loading,
    error,
    formData,
    setFormData,
    updateProduct,
    deleteProduct,
    fetchProductById,
  } = useProductStore();

  const navigate = useNavigate();
  // Extract the 'id' parameter from the URL
  const { id } = useParams();

  // When the component loads (or if the ID changes), fetch the data for this specific product
  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  // Handle the delete button click
  const handleDelete = async () => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      // Redirect back to the home page after deletion
      navigate("/");
    }
  };

  // If we are currently loading the product data, show a spinner in the middle of the screen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  // If there was an error fetching the product, show the error message
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  // Main render: The Product Details and Edit Form
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN: PRODUCT IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            // Use optional chaining (?.) just in case currentProduct is null for a split second
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="size-full object-cover"
          />
        </div>

        {/* RIGHT COLUMN: PRODUCT EDIT FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>

            {/* The form calls updateProduct when submitted */}
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Stop page reload
                updateProduct(id);
              }}
              className="space-y-6"
            >
              {/* PRODUCT NAME INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  // 'value' is tied to formData.name in our Zustand store. This is called a "controlled component".
                  value={formData.name}
                  // When the user types, we update the store
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* PRODUCT PRICE INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              {/* PRODUCT IMAGE URL INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Image URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>

              {/* FORM ACTIONS (Delete and Save Buttons) */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error"
                >
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  // Disable the Save button if the app is currently loading or if any field is empty
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image
                  }
                >
                  {/* Show a spinner inside the button if it's currently saving */}
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
