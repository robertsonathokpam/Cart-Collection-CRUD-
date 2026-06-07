// arcjet.js is a configuration file for Arcjet.
// Arcjet is a security library that helps protect your app from malicious bots and abuse.
// It also provides rate limiting (e.g., stopping a single user from making 1000 requests per second).

// Import the main arcjet function, and specific rules like tokenBucket (for rate limiting), shield (general protection), and detectBot.
import arcjet, { tokenBucket, shield, detectBot } from '@arcjet/node';

// Import dotenv to load environment variables (like secret API keys) from the .env file.
import dotenv from "dotenv";

// Load those variables into process.env
dotenv.config();

// Initialize and export the Arcjet configuration so we can use it in server.js
export const aj = arcjet({
    // Your secret Arcjet key from the .env file. Never hardcode secrets directly in your code!
    key: process.env.ARCJET_KEY,
    // What characteristic should Arcjet use to identify a "user"? Here, we use their IP address ("ip.src").
    characteristics: ["ip.src"],
    // Define the rules for protection:
    rules: [
      // 1. Shield: Protects against common web attacks. 
      // DRY_RUN mode means it will log what it *would* do without actually blocking the request yet.
      shield({ mode: "DRY_RUN" }),
      
      // 2. Bot Detection: Identifies if the request is coming from a bot rather than a real human.
      detectBot({ 
        mode: "DRY_RUN",
        // Allow certain "good" bots, like Google or Bing search engine crawlers, so your site can still be indexed on Google.
        allow: ["CATEGORY_SEARCH_ENGINE"]
      }),
      
      // 3. Rate Limiting: Uses a "Token Bucket" algorithm. 
      tokenBucket({
        mode: "DRY_RUN",
        interval: 5,     // The time window (in seconds)
        capacity: 20,    // Maximum number of tokens (requests) a user can hold at once
        refillRate: 30   // How many tokens to add back to the bucket every interval
      })
    ]
});
