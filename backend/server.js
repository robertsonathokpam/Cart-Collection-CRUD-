import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT||3000;
const __dirname=path.resolve();

//helmet is security middleware that protect the app by setting various http headers
// FIX: Configure Helmet to allow external images
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https:", "http:"],
      },
    },
  })
); 
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
//console.log(PORT);


// apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    // MAGIC TRICK: Check if the request is coming from your local computer
    const isLocalhost = req.ip === "127.0.0.1" || req.ip === "::1" || req.ip === "::ffff:127.0.0.1";

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        if (isLocalhost) {
            console.log("Arcjet: Local traffic detected, allowing for development.");
            return next();
        }
        return res.status(403).json({ error: "Bot access denied" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      if (isLocalhost) return next();
      return res.status(403).json({ error: "Spoofed bot detected" });
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});


app.use("/api/products",productRoutes);

if(process.env.NODE_ENV==="production"){
   //SERVE FRONTEND
    app.use(express.static(path.join(__dirname,"frontend","dist")));
    app.get(/.*/,(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    });
}

async function initDB(){
   try{
     await sql`
       CREATE TABLE IF NOT EXISTS products(
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         image VARCHAR(255) NOT NULL,
         price DECIMAL(10,2) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )
     `;
    console.log("database initilaised");
   } catch(error){
      console.log("Error occured",error);
   }
}

/*
app.get("/",(req,res)=>{
    res.send("Backend main route is here");
});

app.get("/test",(req,res)=>{
    res.send("test route is here");
});
*/

initDB().then(()=>{
  app.listen(PORT,()=>{
   console.log("Server running on port number " + PORT);
});
});



//type node backend/server.js to run the server
//to make the command line shorter in the terminal make some changes in the package.json
//you can just write npm run dev
//install nodemon -D also to restart any  dynamic changes in port number and other purpose
//"scripts": {
//    "dev":"nodemon backend/server.js" or "node backend/server.js"
// },
//make this change

