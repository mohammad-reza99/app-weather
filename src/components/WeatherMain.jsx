import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { fonts } from "../styles/styleGuide";
import sunIcon from "../assets/images/icon-suny.webp";
import bgSmall from "../assets/images/bg-today-small.svg";
import bgLarg from "../assets/images/bg-today-larg.svg";

const WeatherMain = () => {
  const { weatherData, loading, error, convertTemperature, convertWindSpeed } =
    useContext(WeatherContext);

  if (loading)
    return (
      <p className="text-neutral-300 mt-6 text-lg">Loadingweather data....</p>
    );

  if (error)
    return <p className="text-red-400 mt-6 text-lg text-center">{error}</p>;

  if (!weatherData)
    return (
      <p className="text-neutral-400 mt-6 text-lg text-center">
        Search for a city to see the weather
      </p>
    );

  const {
    city,
    country,
    current,
    daily: { time: dailyDates, temprature_2m_max, temprature_2m_min } = {},
  } = weatherData;
  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-[750px]">
      <div className="relative w-full h-[220px] rounded-xl shadow-lg overflow-hidden">
        <picture>
          <source media="(min-width: 640px)" srcSet={bgLarg} />
          <img
            src={bgSmall}
            alt="weather background"
            className="absolute inset-0 w-full object-cover"
          />
        </picture>

        <div className="relative z-10 flex flex-col justify-between h-full p-6 text-neutral-0">
          <div>
            <h2
              style={{ fontFamily: fonts.body }}
              className="text-lg sm:text-xl font-semibold"
            >
              {city} , {country}
            </h2>
            <p className="text-neutral-300 text-sm">
              {new Data(current.time).toLocaleString("en-GB", {
                weekDay: "long",
                houre: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="flex justify-between items-center mt-4">
              <img src={sunIcon} alt="Weather icon" className="w-32 h-32" />
              <p
                style={{ fontFamily: fonts.display }}
                className="text-6xl font-bold"
              >
                {convertTemperature(current.temperature).toFixed(1)}°
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {[
            {
              label: "Wind",
              value: `${convertWindSpeed(current.windspeed).toFixed(
                1
              )} ${"km/h"}`,
            },
            {
              label: "Humidity",
              value: `${current.relative_humidity_2m ?? "--"}%`,
            },
            {
              label: "Feels Like",
              value: `${convertTemperature(current.temperature).toFixed(1)}°`,
            },
            {
              label: "Direction",
              value: `${current.winddirection ?? "--"}°`,
            },
          ].map((irem) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center bg-neutral-700 rounded-lg py-5 px-6 shadow-sm border border-neutral-600 hover:border-blue-500 transition-all"
            >
              <p className="text-neutral-300 text-sm">{item.label}</p>
              <p className="text-neutral-0 text-xl font-semibold">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherMain;
