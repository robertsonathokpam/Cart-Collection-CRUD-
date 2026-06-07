// This component displays a dropdown menu allowing the user to change the visual theme of the entire application.

import { PaletteIcon } from "lucide-react";
// Import our array of available themes from the constants file
import { THEMES } from "../constants";
// Import our Zustand store so we can read the current theme and update it
import { useThemeStore } from "../store/useThemeStore.js";

function ThemeSelector() {
    // Extract the current theme and the function to change it from the store
    const { theme, setTheme } = useThemeStore();
    // A helpful debug log that appears in the browser console
    console.log("Current theme:", theme); 
    
  return (
    // DaisyUI "dropdown" class automatically handles opening/closing when clicked
    <div className="dropdown dropdown-end">
      
      {/* DROPDOWN TRIGGER (The button you click to open the menu) */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      {/* DROPDOWN CONTENT (The menu that appears) */}
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10"
      >
        {/* We loop (map) through every theme in our THEMES array and create a button for each one */}
        {THEMES.map((themeOption) => (
            <button 
              // React requires a unique 'key' when creating lists of elements
              key={themeOption.name}
              className={`
                w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${
                  // If this is the currently selected theme, highlight it!
                  theme === themeOption.name
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-content/5"
                }
              `}
              // When this specific theme button is clicked, tell the store to update the global theme
              onClick={() => setTheme(themeOption.name)}
            >
            
            <PaletteIcon className="size-4" />
            {/* Show the friendly label (e.g., "Forest" instead of "forest") */}
            <span className="text-sm font-medium">{themeOption.label}</span>

            {/* THEME PREVIEW COLORS (The little colored circles) */}
            <div className="ml-auto flex gap-1">
              {/* Loop through the sample colors for this specific theme and draw a tiny circle for each */}
              {themeOption.colors.map((color, i) => (
                <span 
                  key={i} 
                  className="size-2 rounded-full" 
                  // Inline style to dynamically set the background color
                  style={{ backgroundColor: color }} 
                />
              ))}
            </div>
            </button>
          ))}
      </div>
    </div>
  )
}

export default ThemeSelector;