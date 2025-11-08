import { useState } from "react";
import { colors, fonts } from "../styles/styleGuide";
import Logo from "../assets/images/logo.svg";
import Unit from "../assets/images/icon-units.svg";
import Dropdown from "../assets/images/icon-dropdown.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full py-6 px-6 sm:px-12 flex flex-col items-center shadow-md relative">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt=" weather now logo" />
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              backgroundColor: colors.neutral[800],
              fontFamily: fonts.body,
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border-neutral-600 focus:outline-none focus:ring-blue-500 transition-all`}
          >
            <img src={Unit} alt="setting" className="opacity-90" />
            Units
            <img
              src={Dropdown}
              alt=""
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div
        style={{ fontFamily: fonts.display }}
        className="mt-6 text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
      >
        How's the sky looking today?
      </div>
    </header>
  );
};

export default Header;
