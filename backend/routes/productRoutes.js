//backend/routes/productRoutes.js
//this file defines the routes for the products API and maps them to the corresponding controller functions. It uses express.Router() to create a router object and exports it for use in the main server file.

import expres from "express";
import {
     createProduct ,
     getProducts,
     getProduct,
     updateProduct,
     deleteProduct
     } from "../controllers/productController.js";

const router=expres.Router();

router.post("/",createProduct); //function are called here 
router.get("/",getProducts);
router.get("/:id",getProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

export default router;