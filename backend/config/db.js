//this file is responsible for creating a connection to the database and exporting the sql function that we will use to write sql queries

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST,PGPASSWORD,PGUSER,PGDATABASE }=process.env;

//create a sql connection
export const sql=neon(
 `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

//this sql function we export will be used to write sql query

//postgresql://neondb_owner:npg_ji8xmEZGDs1N@ep-polished-resonance-ap90r8i0.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require