// this file is responsible for creating a connection to the database and exporting the sql function that we will use to write sql queries

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// create a sql connection using the environment variable
export const sql = neon(process.env.DATABASE_URL);

// this sql function we export will be used to write sql queries