import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tempUnit, setTempUnit] = useState("celsius");
  const [windUnit, setWindUnit] = useState("kmh");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const fetchWeatherByCoords = async (
    latitude,
    longitude,
    cityName = "",
    countryName = "",
  ) => {
    try {
      setLoading(true);
      setError("");
      setWeatherData(null);

      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/gfs?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`,
      );

      if (!weatherRes.data.current_weather) {
        setError("No weather data available for this location");
        return;
      }

      setWeatherData({
        city: cityName || "Current Location",
        country: countryName || "",
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

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      setWeatherData(null);

      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName.trim()}&count=1&language=en`,
      );

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        setError("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoRes.data.results[0];

      await fetchWeatherByCoords(latitude, longitude, name, country);
    } catch (err) {
      console.error("Weather API error:", err);
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setError("");
    setLoading(true);
    setWeatherData(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const reverseGeoRes = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en`,
          );

          let cityName = "Current Location";
          let countryName = "";

          if (
            reverseGeoRes.data.results &&
            reverseGeoRes.data.results.length > 0
          ) {
            cityName = reverseGeoRes.data.results[0].name || "Current Location";
            countryName = reverseGeoRes.data.results[0].country || "";
          }

          await fetchWeatherByCoords(
            latitude,
            longitude,
            cityName,
            countryName,
          );
        } catch (err) {
          console.error("Reverse geocoding error:", err);
          await fetchWeatherByCoords(latitude, longitude);
        }
      },
      () => {
        setLoading(false);
        setError("Unable to retrieve your location");
      },
    );
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
        fetchWeatherByCoords,
        getUserLocation,
        tempUnit,
        setTempUnit,
        windUnit,
        setWindUnit,
        convertTemperature,
        convertWindSpeed,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
