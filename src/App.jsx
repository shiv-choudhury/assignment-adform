import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { setThemeAsync } from "./store/themeSlice";
import Campaigns from "./components/Campaigns";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(setThemeAsync(theme));
  }, [dispatch, theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    dispatch(setThemeAsync(nextTheme));
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      // className={`min-h-screen dark:bg-gray-900 dark:text-white bg-white text-gray-900`}
    >
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleToggleTheme}
            className="px-4 py-2 rounded border border-gray-300"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
        <Campaigns />
      </div>
    </div>
  );
}

export default App;
