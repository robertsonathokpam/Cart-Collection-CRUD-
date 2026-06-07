// This file is responsible for creating a connection to your PostgreSQL database.
// It exports the `sql` function, which you will use throughout the backend to write SQL queries.

// Import the 'neon' function from the serverless postgres driver. This lets us talk to a Neon Postgres database.
import { neon } from "@neondatabase/serverless";
// Import dotenv so we can read the secret DATABASE_URL from our .env file
import dotenv from "dotenv";

// Load the environment variables from the .env file into the process.env object
dotenv.config();

// Create the SQL connection using the database URL from your environment variables.
// `process.env.DATABASE_URL` is the secret string that contains your username, password, and database host.
export const sql = neon(process.env.DATABASE_URL);

// The `sql` function we just exported will be used in our controllers (like productController.js) 
// to write and execute SQL queries (like SELECT, INSERT, UPDATE).