//this file defines the controller functions for handling product-related API requests. Each function corresponds to a specific CRUD operation (Create, Read, Update, Delete) and interacts with the database using SQL queries. The functions are designed to handle incoming requests, perform the necessary database operations, and send appropriate responses back to the client.

import { sql } from "../config/db.js";

//crud operations for products

export const getProducts=async(req,res)=>{
   try{
     const products=await 
     sql`
     SELECT * FROM products
     ORDER BY created_at DESC
     `;
     console.log("Fetched products:", products);
     res.status(200).json({ success: true, data: products});
   } catch (error) {
    console.error("Error fetching products:", error);
     res.status(500).json({ message: error.message });
   }
};


export const createProduct=async(req,res)=>{
   try{
     const { name, price,image } = req.body;
     if(!name || !price || !image){
        return res.status(400).json({ message: "Name, price and image are required" });
     }
     const newProduct=await sql
     `
     INSERT INTO products (name, price, image)
     VALUES (${name}, ${price}, ${image}) 
     RETURNING *
     `;
      console.log("Created product:", newProduct);
     res.status(201).json({ success: true, data: newProduct[0] });
   } catch (error) {
     console.error("Error creating product:", error);
     res.status(500).json({ message: error.message });
   }
};


export const getProduct=async(req,res)=>{
   try{
     const { id } = req.params;
     const product=await sql`
     SELECT * FROM products WHERE id = ${id}
     `;
     console.log("Fetched product:", product);
     res.json({ success: true, data: product[0] });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};


export const updateProduct=async(req,res)=>{
   try{
     const { id } = req.params;
     const { name, price, image } = req.body;

     const updateProduct=await sql`
     UPDATE products 
     SET name = ${name}, price = ${price}, image = ${image} 
     WHERE id = ${id} 
     RETURNING *
     `;

     if (updateProduct.length === 0) {
         return res.status(404).json({ message: "Product not found" });
     }

     res.json({ success: true, data: updateProduct[0] });

   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};


export const deleteProduct=async(req,res)=>{
   try{
     const { id } = req.params;

     const deleteProduct=await sql`
     DELETE FROM products WHERE id = ${id}
     RETURNING *
     `;

     if (deleteProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
     }
     res.json({ message: "Product deleted successfully" });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};