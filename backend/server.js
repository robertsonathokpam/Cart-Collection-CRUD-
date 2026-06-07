// Import the express framework to build our web server
import express from "express";
// Import helmet, a security middleware that sets various HTTP headers to protect the app
import helmet from "helmet";
// Import morgan, a middleware that logs incoming requests to the console (useful for debugging)
import morgan from "morgan";
// Import cors, a middleware that allows our frontend (React) to communicate with this backend, even if they run on different ports
import cors from "cors";
// Import dotenv to load environment variables from the .env file (like secret database URLs)
import dotenv from "dotenv";
// Import path, a built-in Node.js module to help us work with file and directory paths
import path from "path";

// Import our custom route definitions for products
import productRoutes from "./routes/productRoutes.js";
// Import the configured database connection function
import { sql } from "./config/db.js";
// Import arcjet, a tool for rate-limiting and bot protection
import { aj } from "./lib/arcjet.js";

// Call config() on dotenv so it reads the .env file and loads those variables into process.env
dotenv.config();

// Create an instance of an Express application
const app = express();
// Define the PORT. It will use the PORT from the .env file if it exists, otherwise it defaults to 3000
const PORT = process.env.PORT || 3000;
// Calculate the current directory's absolute path
const __dirname = path.resolve();

// --- MIDDLEWARE SETUP ---

// Use helmet for basic security. We specifically configure the Content Security Policy (CSP)
// FIX: Configure Helmet to allow external images (like from 'data:', 'https:', etc.)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        // Allow images to be loaded from these sources
        "img-src": ["'self'", "data:", "https:", "http:"],
      },
    },
  })
); 

// Use morgan in "dev" mode, which prints short logs for every request (e.g., "GET /api/products 200")
app.use(morgan("dev"));
// Middleware to parse incoming requests with JSON payloads (so we can read req.body in our controllers)
app.use(express.json());
// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Apply arcjet rate-limit to all routes to protect against spam or brute-force attacks
app.use(async (req, res, next) => {
  try {
    // Ask Arcjet to evaluate the current request
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    // MAGIC TRICK: Check if the request is coming from your local computer (localhost)
    const isLocalhost = req.ip === "127.0.0.1" || req.ip === "::1" || req.ip === "::ffff:127.0.0.1";

    // If Arcjet decides this request should be denied (e.g., too many requests, or it's a bot)
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        // HTTP 429 means "Too Many Requests"
        return res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        // If it's a bot, but it's coming from localhost, we allow it (for development purposes)
        if (isLocalhost) {
            console.log("Arcjet: Local traffic detected, allowing for development.");
            return next();
        }
        // Otherwise, deny the bot
        return res.status(403).json({ error: "Bot access denied" });
      } else {
        // Catch-all for other forbidden reasons
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    // Check for spoofed bots (fake bots pretending to be good bots)
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      if (isLocalhost) return next();
      return res.status(403).json({ error: "Spoofed bot detected" });
    }

    // If everything is fine, pass the request to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error); // Pass the error to Express's error handler
  }
});

// --- ROUTE SETUP ---

// Tell Express to use our productRoutes for any URL that starts with "/api/products"
app.use("/api/products", productRoutes);

// --- PRODUCTION SETUP ---
// When we deploy the app (NODE_ENV is "production"), we want to serve the React frontend too
if (process.env.NODE_ENV === "production") {
    // Tell Express to serve static files (like JS, CSS, images) from the React "dist" folder
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    
    // For ANY other route (that isn't an API route), send the React "index.html" file.
    // This allows React Router to handle page navigation on the frontend.
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// --- DATABASE INITIALIZATION ---
// This function ensures our database table exists before we start accepting requests
async function initDB() {
   try {
     // Run a SQL query to create the 'products' table if it doesn't already exist
     await sql`
       CREATE TABLE IF NOT EXISTS products(
         id SERIAL PRIMARY KEY, -- A unique ID that automatically increments
         name VARCHAR(255) NOT NULL, -- The product name
         image VARCHAR(255) NOT NULL, -- The URL to the product image
         price DECIMAL(10,2) NOT NULL, -- The price with up to 2 decimal places
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Automatically saves when the product was created
       )
     `;
    console.log("Database initialized successfully.");
   } catch(error) {
      console.log("Error occurred while initializing database:", error);
   }
}

// First, initialize the database. THEN, start listening for incoming requests on the PORT
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port number " + PORT);
  });
});

// --- HELPFUL TIPS ---
// Type `node backend/server.js` to run the server
// To make the command line shorter in the terminal, you can make changes in `package.json`
// You can just write `npm run dev` if you configure it.
// Install nodemon (`npm install nodemon -D`) to automatically restart the server when you save changes.
// Example package.json change:
// "scripts": {
//    "dev": "nodemon backend/server.js" // or "node backend/server.js"
// }
