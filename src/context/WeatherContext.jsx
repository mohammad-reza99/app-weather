import { createContext, useState } from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tempUnit, setTempUnit] = useState("celsius");
  const [windUnit, setWindUnit] = useState("kmh");

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      setWeatherData(null);

      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName.trim()}&count=1&language=en`
      );

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        setError("City not found");
        return;
      }

      const { latitude, longitude, name, country } = geoRes.data.results[0];

      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/gfs?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
      );

      if (!weatherRes.data.current_weather) {
        setError("No weather data available for this city");
        return;
      }

      setWeatherData({
        city: name,
        country,
        current: weatherRes.data.current_weather,
        hourly: weatherRes.data.hourly,
        daily: weatherRes.data.daily,
      });
    } catch (err) {
      console.error("Weather API error:", err);
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const convertTemperature = (temp) => {
    if (temp == null) return 0;
    return tempUnit === "celsius" ? temp : (temp * 9) / 5 + 32;
  };

  const convertWindSpeed = (speed) => {
    if (speed == null) return 0;
    return windUnit === "kmh" ? speed : speed / 1.609;
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        fetchWeather,
        tempUnit,
        setTempUnit,
        windUnit,
        setWindUnit,
        convertTemperature,
        convertWindSpeed,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
