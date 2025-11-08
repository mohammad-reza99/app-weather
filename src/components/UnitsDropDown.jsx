import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { colors, fonts } from "../styles/styleGuide";
import IconCheck from "../assets/images/icon-checkmark.svg";

const UnitsDropDown = () => {
  const { tempUnit, setTempUnit, windUnit, setWindUnit } =
    useContext(WeatherContext);
  return (
    <div
      style={{ backgroundColor: colors.neutral[800], color: colors.neutral[0] }}
      className="absolute right-0 mt-2 w-64 rounded-lg border border-neutral-600 text-sm z-50 p-4"
    >
      <div className="mb-3">
        <p className="text-neutral-300 font-semibold mb-1">Temperature</p>
        <button
          onClick={() => setTempUnit("celsius")}
          className="flex items-center justify-between w-full py-1 hover:text-blue-400"
        >
          <span>Celsius (°C)</span>
          {tempUnit === "celsius" && (
            <img src={IconCheck} alt="selected" className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={() => setTempUnit("Fahrenheit")}
          className="flex items-center justify-between w-full py-1 hover:text-blue-400"
        >
          <span>Fahrenheit (°F)</span>
          {tempUnit === "fahrenheit" && (
            <img src={IconCheck} alt="selected" className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="mb-3 border-t border-neutral-600 pt-3">
        <p className="text-neutral-300 font-semibold mb-1">Wind Speed</p>
        <button
          onClick={() => setWindUnit("kmh")}
          className="flex items-center justify-between w-full py-1 hover:text-blue-400"
        >
          <span>Km/h</span>
          {windUnit === "kmh" && (
            <img src={IconCheck} alt="selected" className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={() => setWindUnit("mph")}
          className="flex items-center justify-between w-full py-1 hover:text-blue-400"
        >
          <span>mph</span>
          {windUnit === "mph" && (
            <img src={IconCheck} alt="selected" className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UnitsDropDown;
