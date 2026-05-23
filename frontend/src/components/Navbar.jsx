import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";
import { ShoppingBagIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useProductStore } from "../store/useProductStore";

function Navbar() {
  const { pathname } = useResolvedPath();//this is added to get the current path of the page for example if we are on home page then pathname will be "/" and if we are on product page then pathname will be "/product/:id"
  const isHomePage = pathname === "/";// this is added to check if we are on home page or not because we want to show the cart icon only on home page and hide it on product page
  const {products}=useProductStore();
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-4[rem] justify-between">
          {/*logo*/}
          <div className="flex-1 lg:flex-none">
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
          {/*Right section*/}
          {/* this is added to show the cart icon only on home page and hide it on product page */}
          <div className="flex items-center gap-4">
            <ThemeSelector />
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingBagIcon className="size-5" />
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
