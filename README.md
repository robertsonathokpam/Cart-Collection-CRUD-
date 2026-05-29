#  Cart Collection CRUD (PERN Stack Application)

A modern, premium, full-stack **PERN (PostgreSQL, Express, React, Node.js)** web application featuring an immersive UI, robust security, rate limiting, and 13 responsive DaisyUI themes. 

This project showcases a fully functional product inventory with dynamic **Create, Read, Update, and Delete (CRUD)** operations, server-state synchronization with **Zustand**, and a serverless PostgreSQL database hosted on **Neon**.

---

##  Key Features

* **Full CRUD Operations**: Create new products, fetch all products, view/edit single products, and delete products from the inventory.
* **13 Premium DaisyUI Themes**: Seamlessly switch between 13 custom-curated themes (such as Forest, Cyberpunk, Synthwave, Dracula, and Retro) with automatic persistence in `localStorage`.
* **Advanced Security & Protection**:
  * **Arcjet Protection**: Rate limiting, bot detection, and request shielding integrated directly into the middleware using `@arcjet/node`.
  * **Helmet Integration**: Secure HTTP headers with configured Content Security Policies (CSP) to dynamically fetch and load external images from sources like Unsplash.
* **Modern State Management**: Zustand stores manage both global application theme and product states (including loading animations, toast alerts, error banners, and form bindings).
* **Serverless SQL Execution**: Directly runs optimized, raw SQL queries against Neon PostgreSQL database for lightning-fast database access.
* **Automatic Production Bundling**: In production mode, the Express server serves compiled React assets directly from the `frontend/dist` directory.

---

##  Tech Stack & Imported Software

The project is divided into a robust server-side backend and a highly responsive client-side React app.

### 1. Backend Core & Security
* **Node.js**: The underlying runtime environment.
* **Express.js (v5)**: Fast, unopinionated, minimalist web framework used to design the REST API.
* **Neon Database Serverless Client (`@neondatabase/serverless`)**: Lightweight PostgreSQL client driver for serverless database hosting.
* **Arcjet (`@arcjet/node`)**: Security framework handling bot protection, intelligent rate limiting, and WAF shielding.
* **Helmet**: Middleware that configures secure HTTP headers to defend against clickjacking, XSS, and other web threats.
* **Cors**: Middleware enabling Cross-Origin Resource Sharing.
* **Morgan**: HTTP request logging middleware.
* **Dotenv**: Zero-dependency module that loads environment variables from a `.env` file.
* **Nodemon**: Utility used during development to automatically restart the node application when file changes are detected.

### 2. Frontend Framework & Styling
* **React 19 & React DOM**: Frontend user interface library.
* **Vite**: Rapid, modern frontend builder and development server.
* **Tailwind CSS (v3)**: Utility-first CSS framework for custom responsive styling.
* **DaisyUI (v4)**: Tailwind CSS component library providing beautiful widgets and themes.
* **Zustand (v5)**: Minimal, fast, and scalable state-management library.
* **React Router DOM (v7)**: Modern declarative routing engine for single-page application navigation.
* **Axios**: Promise-based HTTP client for calling backend endpoints.
* **Lucide React**: Premium icon pack.
* **React Hot Toast**: Crisp, interactive notification alerts.

---

## 📂 Project Directory Structure

```text
PERN-STACK/
├── backend/
│   ├── config/
│   │   └── db.js                 # PostgreSQL connection pool using Neon
│   ├── controllers/
│   │   └── productController.js  # Product CRUD controller functions
│   ├── lib/
│   │   └── arcjet.js             # Arcjet security & rate limit configurations
│   ├── routes/
│   │   └── productRoutes.js      # REST API router endpoints for products
│   ├── seeds/
│   │   └── products.js           # Database seeder with mock product data
│   └── server.js                 # Main server entrypoint & middleware orchestrator
├── frontend/
│   ├── dist/                     # Optimized frontend production build assets
│   ├── public/                   # Static assets (favicons, public images)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddProductModal.jsx # Popup form modal for creating new products
│   │   │   ├── Navbar.jsx          # Header with branding and theme selection triggers
│   │   │   ├── ProductCard.jsx     # Card view displaying an individual product
│   │   │   └── ThemeSelector.jsx   # Interactive drop-down palette widget
│   │   ├── constants/
│   │   │   └── index.js            # Array containing colors & details of 13 DaisyUI themes
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Landing grid view showing all listed products
│   │   │   └── ProductPage.jsx     # Detailed view of a product with edit & delete controls
│   │   ├── store/
│   │   │   ├── useProductStore.js  # Zustand store for React state & server synchronization
│   │   │   └── useThemeStore.js    # Zustand store managing UI themes & local persistence
│   │   ├── App.jsx                 # Base layout, routing structure, and toast notification wrapper
│   │   ├── index.css               # Global Tailwind directives & basic configurations
│   │   └── main.jsx                # React app renderer entrypoint
│   ├── eslint.config.js          # ESLint rules and settings
│   ├── index.html                # Client main index template
│   ├── package.json              # Frontend package manifest & scripts
│   ├── postcss.config.js         # CSS compiler configurations
│   ├── tailwind.config.js        # Tailwind & DaisyUI theme settings
│   └── vite.config.js            # Vite compiler configurations
├── .env                          # Local credentials & configuration variables (git ignored)
├── .gitignore                    # Excludes security keys and node_modules from Git commits
├── package.json                  # Root folder dependencies, scripts, and monorepo configurations
└── README.md                     # Project documentation (this file)
```

---

## 🔍 Detailed File & Folder Breakdown

### 📂 Root Directory
* **`package.json`**: Configures the project using ES modules (`"type": "module"`). Contains root-level commands like `npm run dev` to launch Nodemon on the backend server, and the comprehensive production command `npm run build` which installs and compiles the frontend assets inside the node lifecycle.
* **`.env`**: Houses crucial configuration values. Keeps sensitive credentials like database connection URIs and Arcjet security keys safe and decoupled from code.
* **`.gitignore`**: Directs Git to ignore transient directories (`node_modules`, `dist`) and configuration files containing sensitive secrets (`.env`).

---

### 📂 `backend/` Folder
* **`server.js` (Main Server Core)**: 
  * Initiates the Express application and listens on the environment port.
  * Connects and registers basic middleware, including **Helmet** (providing headers configured with specialized image source directives to allow external pictures) and **Morgan** (running standard HTTP logs).
  * Executes the **Arcjet middleware** to intercept incoming requests and verify that rate limit quotas are respected, spoofed bots are blocked, and development traffic on localhost is allowed.
  * Maps product REST routes under `/api/products`.
  * Bootstraps the application by running raw SQL queries (`CREATE TABLE IF NOT EXISTS`) to initialize the PostgreSQL table structure automatically before launching.
  * Serves React production builds in production mode dynamically.
* **`config/db.js`**:
  * Configures connection details by initializing the Neon serverless PostgreSQL client instance (`neon`).
  * Exports the `sql` helper instance to run query scripts throughout the server controllers.
* **`lib/arcjet.js`**:
  * Registers and imports Arcjet modules.
  * Details the security engine rule chains including `shield` protection, `detectBot` with indexing engine allowances, and a custom `tokenBucket` algorithm allocating a replenishment pool of tokens for API rate limits.
* **`routes/productRoutes.js`**:
  * Uses `express.Router` to declare HTTP method pathways and mapping routes.
  * Coordinates incoming CRUD requests directly to their controller implementations.
* **`controllers/productController.js`**:
  * Contains the core SQL transactions for CRUD operations:
    * `getProducts`: Fetches the entire directory ordered by newest creation date (`SELECT * FROM products ORDER BY created_at DESC`).
    * `createProduct`: Validates data and inserts a new row returning the database object (`INSERT INTO products ... RETURNING *`).
    * `getProduct`: Resolves individual product items (`SELECT * WHERE id = ...`).
    * `updateProduct`: Updates current data dynamically and reports changes (`UPDATE products SET ... WHERE id = ... RETURNING *`).
    * `deleteProduct`: Removes a product completely (`DELETE FROM products WHERE id = ... RETURNING *`).
* **`seeds/products.js`**:
  * A standalone seeder script.
  * Erases pre-existing mock logs using SQL `TRUNCATE` and cycles through an array of curated hardware/gadget objects (with premium Unsplash image placeholders) to seed the table.

---

### 📂 `frontend/` Folder
* **`vite.config.js`**: Setup configurations for the Vite build engine including React plugins.
* **`tailwind.config.js`**: Loads Tailwind plugins, configures typography, and imports **DaisyUI**. Defines the themes registered by the selectors.
* **`src/main.jsx`**: Initializes React's root DOM node and wraps `App` in React Router's browser context.
* **`src/App.jsx`**:
  * Sets the root layouts, imports the `Toaster` notifications handler, and binds the global HTML data attribute `data-theme` directly to the Zustand theme store state.
  * Maps route pathways (`/` to the grid HomePage, and `/product/:id` to the Product details dashboard).
* **`src/store/useThemeStore.js`**:
  * A lightweight Zustand store representing the chosen theme.
  * Persists choices directly into the browser's `localStorage` (defaulting to the `"forest"` theme).
* **`src/store/useProductStore.js` (State Center)**:
  * Manages global variables: `products` array, `currentProduct` detail, request `loading` hooks, transaction `error` strings, and active `formData`.
  * Detects environment variables to choose whether to query endpoints on `http://localhost:3000` (in development) or default relative paths (in production builds).
  * Encapsulates React state actions:
    * `fetchProducts`: Fires backend queries and resolves values. Gracefully handles HTTP `429` statuses to alert the frontend when Arcjet rate limits trigger.
    * `addProduct` / `updateProduct` / `deleteProduct`: Coordinates network operations, updates client UI state smoothly, and launches colorful React Hot Toasts upon completion.
* **`src/components/AddProductModal.jsx`**:
  * Modal drawer leveraging DaisyUI tags.
  * Provides form inputs that bind dynamically to `useProductStore` variables and functions.
* **`src/components/Navbar.jsx`**:
  * Main header bar.
  * Offers an "Add Product" button that toggles the state modal, and embeds the interactive theme dropdown.
* **`src/components/ThemeSelector.jsx`**:
  * Renders a dropdown menu populated with the 13 available themes.
  * Displays three color preview dots next to each theme, helping the user preview the primary palette before selecting it.
* **`src/components/ProductCard.jsx`**:
  * Modern card showcasing the product details.
  * Displays product image, price, and action buttons to view detail or delete.
* **`src/pages/HomePage.jsx`**:
  * Orchestrates data collection.
  * Renders progress indicators, error alerts, blank state descriptions when list arrays return empty, or a dynamic responsive responsive grid.
* **`src/pages/ProductPage.jsx`**:
  * An isolated control panel for an individual product, letting users preview changes in real-time, modify product data, or delete the inventory listing.

---

##  Environment Configuration

To connect this application successfully, you must configure environmental parameters. 

Create a file named `.env` in the **root** folder and populate it with the following structure:

```env
# Application Port
PORT=3000

# PostgreSQL Connection Credentials (Neon.tech or generic PostgreSQL URL)
DATABASE_URL="postgres://your_user:your_password@your_host.neon.tech/your_db?sslmode=require"

# Arcjet Key Security
ARCJET_KEY="ajkey_yourkeyhere"

# Environment Type (development / production)
ARCJET_ENV=development
NODE_ENV=development
```

---

## ⚙️ Installation & Usage Guide

Follow these steps to configure and run the application locally:

### 1. Clone & Install Dependencies
Run this in the root directory to install backend dependencies, frontend dependencies, and trigger setup scripts:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### 2. Initialize Database & Seed Sample Products
Populate your PostgreSQL database with the initial table configuration and a rich array of sample gadget products:
```bash
# Seed the database
node backend/seeds/products.js
```

### 3. Run Development Server
To launch both servers simultaneously with hot-reloading (using nodemon on the backend server):
```bash
# Run in development mode
npm run dev
```
* **Backend API**: Running on [http://localhost:3000](http://localhost:3000)
* **Frontend Client (Vite)**: Open the URL provided by Vite terminal output (typically [http://localhost:5173](http://localhost:5173))

### 4. Build and Launch Production Server
To build the static assets and run the application in production mode:
```bash
# Build the React frontend
npm run build

# Start the unified backend production server
npm start
```
Once started, navigate to [http://localhost:3000](http://localhost:3000) where the Express server will securely handle API calls and serve the React Single Page App statically.

---

## 🔒 Security Architecture: How Arcjet works
Arcjet acts as an active request bodyguard inside `backend/server.js`.
When a client hits an endpoint:
1. The server forwards metadata (client IP, request speed, user-agent) to Arcjet.
2. Arcjet tests rules against:
   * **Shield**: Checks if the request resembles common Web Application attacks.
   * **Bot Detection**: Determines if the client is an automated scraping tool or crawler.
   * **Rate Limiting**: Checks if the IP has exceeded 20 requests per 5-second interval.
3. If allowed, control is handed to product controllers (`next()`).
4. If denied, Express halts and returns a descriptive error code (`429 Too Many Requests` or `403 Access Denied`).
