// This is a "seed" file. It is used to quickly fill your database with dummy data.
// It's very useful when you're first building an app and need some products to show on the screen.

// Import our database connection function
import { sql } from "../config/db.js";

// Create an array of sample products (fake data)
const SAMPLE_PRODUCTS = [
  {
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Mechanical Gaming Keyboard",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Smart Watch Pro",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "4K Ultra HD Camera",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Minimalist Backpack",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Wireless Gaming Mouse",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Smart Home Speaker",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "LED Gaming Monitor",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
  },
];

// Define an asynchronous function to do the database seeding
async function seedDatabase() {
  try {
    // Step 1: Clear out any existing data in the 'products' table.
    // 'TRUNCATE' empties the table. 
    // 'RESTART IDENTITY' resets the auto-incrementing ID back to 1.
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    // Step 2: Loop through our array of sample products
    for (const product of SAMPLE_PRODUCTS) {
      // Step 3: Insert each product into the database table
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    // Log success
    console.log("Database seeded successfully");
    // Exit the script successfully (Code 0 means no errors)
    process.exit(0); 
  } catch (error) {
    // If something goes wrong, log the error
    console.error("Error seeding database:", error);
    // Exit the script with an error code (Code 1 means failure)
    process.exit(1); 
  }
}

// Call the function so it actually runs when we execute this file
seedDatabase();