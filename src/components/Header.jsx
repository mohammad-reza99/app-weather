import { useContext, useState } from "react";
import { colors, fonts } from "../styles/styleGuide";
import Logo from "../assets/images/logo.svg";
import Unit from "../assets/images/icon-units.svg";
import Dropdown from "../assets/images/icon-dropdown.svg";
import UnitsDropDown from "./UnitsDropDown";
import { WeatherContext } from "../context/WeatherContext";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(WeatherContext);

  return (
    <header className="w-full py-6 px-6 sm:px-12 flex flex-col items-center shadow-md relative">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="weather now logo" />
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor:
                theme === "dark" ? colors.neutral[800] : colors.neutral[200],
              color: theme === "dark" ? colors.neutral[0] : colors.neutral[900],
              fontFamily: fonts.body,
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            {theme === "dark" ? "Dark" : "Light"}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                backgroundColor:
                  theme === "dark" ? colors.neutral[800] : colors.neutral[200],
                color:
                  theme === "dark" ? colors.neutral[0] : colors.neutral[900],
                fontFamily: fonts.body,
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <img src={Unit} alt="settings" className="opacity-90" />
              Units
              <img
                src={Dropdown}
                alt="dropdown"
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && <UnitsDropDown />}
          </div>
        </div>
      </div>

      <div
        style={{ fontFamily: fonts.display }}
        className="mt-6 text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
      >
        How&apos;s the sky looking today?
      </div>
    </header>
  );
};

export default Header;
