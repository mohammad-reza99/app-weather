import { useContext, useState, useMemo } from "react";
import { WeatherContext } from "../context/WeatherContext";
import dropDownIcon from "../assets/images/icon-dropdown.svg";
import { fonts } from "../styles/styleGuide";

const HourlyForecast = () => {
  const { weatherData, convertTemperature, loading } =
    useContext(WeatherContext);
  const [selectedDay, setSelectedDay] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const days = useMemo(() => {
    if (!weatherData?.daily?.time) return [];
    return weatherData.daily.time.map((date) =>
      new Date(date).toLocaleDateString("en-GB", { weekday: "long" })
    );
  }, [weatherData]);

  const hours = useMemo(() => {
    if (!weatherData?.hourly) return [];

    return weatherData.hourly.time.map((time, i) => ({
      time: new Date(time).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: convertTemperature(weatherData.hourly.temperature_2m[i]).toFixed(0),
    }));
  }, [weatherData]);

  if (!selectedDay && days.length > 0 && !loading) {
    setSelectedDay(days[0]);
  }

  if (!weatherData)
    return (
      <p className="text-neutral-400 mt-6 text-lg text-center">
        Search for a city to view hourly forecast
      </p>
    );

  return (
    <aside className="w-full bg-neutral-700 rounded-xl p-5 border border-neutral-600 flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-4">
        <h3
          style={{ fontFamily: fonts.body }}
          className="text-neutral-300 text-sm font-medium"
        >
          Hourly Forecast
        </h3>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-36 bg-neutral-800 border border-neutral-600 text-neutral-0 text-sm px-3 py-1.5 rounded-md hover:border-blue-500 transition-all"
          >
            {selectedDay || "Select day"}
            <img
              src={dropDownIcon}
              alt="dropdown"
              className={`w-3 h-3 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-1 bg-neutral-800 border border-neutral-600 rounded-md w-36 shadow-lg z-50 overflow-hidden">
              {days.map((day) => (
                <li
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                    selectedDay === day
                      ? "bg-neutral-600 text-blue-400"
                      : "text-neutral-0 hover:bg-neutral-700"
                  }`}
                >
                  {day}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pr-1">
        {hours.slice(0, 8).map((hour, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 hover:border-blue-500 transition-all"
          >
            <p className="text-neutral-0 font-medium">{hour.time}</p>
            <p
              style={{ fontFamily: fonts.body }}
              className="text-neutral-0 text-lg font-semibold"
            >
              {hour.temp}°
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default HourlyForecast;
