// backend/routes/productRoutes.js
// This file defines the specific URLs (endpoints) for the products API.
// It maps these URLs to the corresponding controller functions (the logic).
// It uses express.Router() to group all these product-related routes together.

// Import express to use its Router feature
import express from "express";

// Import all the logic functions (controllers) that handle what to do when these routes are visited
import {
     createProduct,
     getProducts,
     getProduct,
     updateProduct,
     deleteProduct
} from "../controllers/productController.js";

// Create a new router object. Think of this as a mini-app just for handling product routes.
const router = express.Router();

// Define the routes:

// 1. CREATE: When a POST request is made to "/" (which translates to "/api/products/" in server.js)
// It will run the `createProduct` function to save a new product.
router.post("/", createProduct); 

// 2. READ ALL: When a GET request is made to "/"
// It will run `getProducts` to fetch all products from the database.
router.get("/", getProducts);

// 3. READ ONE: When a GET request is made to a specific ID (like "/api/products/5")
// The ":id" is a dynamic variable. It runs `getProduct` to fetch just that one product.
router.get("/:id", getProduct);

// 4. UPDATE: When a PUT request is made to a specific ID
// It runs `updateProduct` to modify the existing product with that ID.
router.put("/:id", updateProduct);

// 5. DELETE: When a DELETE request is made to a specific ID
// It runs `deleteProduct` to remove that product from the database.
router.delete("/:id", deleteProduct);

// Export the router so it can be imported and used in server.js
export default router;