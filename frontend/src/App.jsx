// This is the main component of your application. It acts as a wrapper for all other pages.
// It sets up the overall layout (like putting the Navbar at the top) and handles the "Routing" (which page to show).

// Import the Navbar component so we can display it at the top of the screen
import Navbar from "./components/Navbar";
// Import Routes and Route from react-router-dom to handle navigating between pages
import { Routes , Route } from "react-router-dom";
// Import the individual page components
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
// Import our custom store that remembers the user's chosen color theme
import { useThemeStore } from "./store/useThemeStore.js";
// Import Toaster, a library that shows little popup notifications (like "Product created successfully!")
import { Toaster } from "react-hot-toast";

function App(){
  // Extract the current 'theme' from our global Zustand store
  const {theme}= useThemeStore();
  
  return (
    // The main container for the entire app. 
    // 'min-h-screen' ensures it takes up at least the full height of the browser window.
    // 'data-theme={theme}' is a trick used by DaisyUI to apply the current color theme to the whole app.
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
    
      {/* We put the Navbar OUTSIDE of the <Routes> block because we want it to be visible on ALL pages */}
      <Navbar /> 
    
      {/* The <Routes> component decides which <Route> to show based on the current URL */}
      <Routes>
        {/* If the URL is just "/" (the root), show the HomePage component */}
        <Route path="/" element={<HomePage/>} />
        {/* If the URL is "/product/something" (like /product/5), show the ProductPage component. The ':id' is dynamic. */}
        <Route path="/product/:id" element={<ProductPage/>} />
      </Routes>
      
     {/* The Toaster component needs to be rendered somewhere in the app so it can display popups when we call toast() */}
     <Toaster/>
    </div>
  );
}

// Export the App component so it can be imported and used in main.jsx
export default App;