import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { fonts } from "../styles/styleGuide";
import sunIcon from "../assets/images/icon-sunny.webp";
import rainIcon from "../assets/images/icon-rain.webp";
import cloudIcon from "../assets/images/icon-partly-cloudy.webp";
import snowIcon from "../assets/images/icon-snow.webp";

const getIcon = (maxTemp, precipitation) => {
  if (precipitation > 5) return rainIcon;
  if (maxTemp < 3) return snowIcon;
  if (maxTemp > 25) return sunIcon;
  return cloudIcon;
};

const DailyForecast = () => {
  const { weatherData } = useContext(WeatherContext);

  if (!weatherData || !weatherData.daily) return null;

  const { daily } = weatherData;
  const { time, temperature_2m_max, temperature_2m_min, precipitation_sum } =
    daily;

  return (
    <section className="w-full max-w-[750px] mt-6">
      <h3
        style={{ fontFamily: fonts.body }}
        className="text-neutral-300 text-sm mb-3"
      >
        7-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {time.map((day, i) => {
          const date = new Date(day);
          const weekday = date.toLocaleDateString("en-us", {
            weekday: "short",
          });
          const max = Math.round(temperature_2m_max[i]);
          const min = Math.round(temperature_2m_min[i]);
          const rain = precipitation_sum[i];
          return (
            <div
              key={day}
              className="flex flex-col items-center justify-center bg-neutral-700 rounded-lg py-3 px-2 border border-neutral-600 hover:border-blue-500 transition-all shadow-sm"
            >
              <p className="text-neutral-0 font-medium text-sm mb-1">
                {weekday}
              </p>
              <img
                src={getIcon(max, rain)}
                alt="weather icon"
                className="w-7 h-7 mb-1"
              />
              <p
                style={{ fontFamily: fonts.display }}
                className="text-neutral-0 text-lg font-semibold"
              >
                {max}° / {min}°
              </p>
              <p className="text-neutral-400 text-xs">{rain.toFixed(1)} mm</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
