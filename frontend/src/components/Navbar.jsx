// This component displays the navigation bar at the top of the screen.

// Link is used instead of <a> tags in React to navigate without reloading the page.
// useResolvedPath helps us figure out what the current URL is.
import { Link, useResolvedPath } from "react-router-dom";
// Icons
import { ShoppingCartIcon, ShoppingBagIcon } from "lucide-react";
// Import the ThemeSelector dropdown component
import ThemeSelector from "./ThemeSelector";
// Import the product store so we can count how many products exist
import { useProductStore } from "../store/useProductStore";

function Navbar() {
  // Get the current path of the page.
  // If we are on the home page, pathname will be "/".
  // If we are on the product page, pathname will be "/product/5".
  const { pathname } = useResolvedPath();
  
  // Create a boolean variable (true/false) to check if we are currently on the Home page.
  // We use this because we only want to show the cart icon on the home page.
  const isHomePage = pathname === "/";
  
  // Get the array of products from our store
  const { products } = useProductStore();
  
  return (
    // sticky top-0 ensures the navbar stays at the top of the screen even when you scroll down
    // backdrop-blur-lg gives it a nice frosted glass effect
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          
          {/* LEFT SECTION: Logo */}
          <div className="flex-1 lg:flex-none">
            {/* Clicking this Link will take the user back to the home page ("/") */}
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  Your Cart Collection!
                </span>
              </div>
            </Link>
          </div>
          
          {/* RIGHT SECTION: Theme Selector and Cart Icon */}
          <div className="flex items-center gap-4">
            {/* Render the dropdown to select a color theme */}
            <ThemeSelector />
            
            {/* This is called "conditional rendering". 
                The stuff inside the parentheses will ONLY appear if isHomePage is true. */}
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  {/* The badge shows the total number of products currently in the database */}
                  <span className="badge badge-sm badge-primary indicator-item">
                    {products.length}
                  </span>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
