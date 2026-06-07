// This file defines the controller functions for handling product-related API requests. 
// Each function corresponds to a specific CRUD operation (Create, Read, Update, Delete) 
// and interacts with the database using SQL queries. 
// The functions are designed to handle incoming requests (req), perform the necessary database operations, 
// and send appropriate responses (res) back to the client (frontend).

// Import our database connection function so we can talk to PostgreSQL
import { sql } from "../config/db.js";

// --- CRUD Operations for Products ---

// 1. GET ALL PRODUCTS (Read)
export const getProducts = async (req, res) => {
   try {
     // Run a SQL query to select everything (*) from the 'products' table, 
     // ordered by the time they were created (newest first)
     const products = await sql`
       SELECT * FROM products
       ORDER BY created_at DESC
     `;
     console.log("Fetched products:", products);
     // Send a successful response (status 200) back to the frontend, along with the products data
     res.status(200).json({ success: true, data: products });
   } catch (error) {
     // If something goes wrong, log the error and send a 500 (Internal Server Error) response
     console.error("Error fetching products:", error);
     res.status(500).json({ message: error.message });
   }
};

// 2. CREATE A PRODUCT (Create)
export const createProduct = async (req, res) => {
   try {
     // Extract the name, price, and image from the request body (the data sent by the user)
     const { name, price, image } = req.body;
     
     // Validation: Check if any required fields are missing
     if (!name || !price || !image) {
        // Send a 400 (Bad Request) response if data is missing
        return res.status(400).json({ message: "Name, price and image are required" });
     }
     
     // Run a SQL query to insert the new product into the database.
     // RETURNING * tells Postgres to send back the newly created row immediately.
     const newProduct = await sql`
       INSERT INTO products (name, price, image)
       VALUES (${name}, ${price}, ${image}) 
       RETURNING *
     `;
     console.log("Created product:", newProduct);
     // Send a 201 (Created) response back to the frontend with the new product data.
     // newProduct is an array of results, so we get the first item ([0]).
     res.status(201).json({ success: true, data: newProduct[0] });
   } catch (error) {
     console.error("Error creating product:", error);
     res.status(500).json({ message: error.message });
   }
};

// 3. GET A SINGLE PRODUCT (Read)
export const getProduct = async (req, res) => {
   try {
     // Extract the product ID from the URL parameters (e.g., /api/products/5 -> id is 5)
     const { id } = req.params;
     
     // Run a SQL query to find the specific product where the ID matches
     const product = await sql`
       SELECT * FROM products WHERE id = ${id}
     `;
     console.log("Fetched product:", product);
     // Send the found product back to the frontend
     res.json({ success: true, data: product[0] });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};

// 4. UPDATE A PRODUCT (Update)
export const updateProduct = async (req, res) => {
   try {
     // Get the ID of the product we want to update from the URL
     const { id } = req.params;
     // Get the new updated data from the request body
     const { name, price, image } = req.body;

     // Run a SQL query to update the row where the ID matches.
     // It replaces the old name, price, and image with the new ones.
     const updateProduct = await sql`
       UPDATE products 
       SET name = ${name}, price = ${price}, image = ${image} 
       WHERE id = ${id} 
       RETURNING *
     `;

     // If the array is empty, it means no product was found with that ID to update
     if (updateProduct.length === 0) {
         return res.status(404).json({ message: "Product not found" });
     }

     // Send back the updated product
     res.json({ success: true, data: updateProduct[0] });

   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};

// 5. DELETE A PRODUCT (Delete)
export const deleteProduct = async (req, res) => {
   try {
     // Get the ID of the product to delete from the URL
     const { id } = req.params;

     // Run a SQL query to delete the row where the ID matches
     const deleteProduct = await sql`
       DELETE FROM products WHERE id = ${id}
       RETURNING *
     `;

     // If the array is empty, it means no product was found with that ID to delete
     if (deleteProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
     }
     // Send a success message back
     res.json({ message: "Product deleted successfully" });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};