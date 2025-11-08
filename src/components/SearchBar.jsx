import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { colors, fonts } from "../styles/styleGuide";
import searchIcon from "../assets/images/icon-search.svg";
import loadingIcon from "../assets/images/icon-loading.svg";
import errorIcon from "../assets/images/icon-error.svg";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { fetchWeather, loading, error } = useContext(WeatherContext);

  const handleSubmite = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchWeather(query);
  };
  return (
    <div className="flex flex-col items-center mt-8 w-full px-4 relative">
      <form
        onSubmit={handleSubmite}
        className={`relative w-full sm:w-[420px] flex items-center rounded-lg border transition-all duration-200 ${
          error
            ? "border-red-500"
            : "border-neutral-500 hover:border-neutral-300 focus-within:border-blue-500"
        }`}
        style={{ backgroundColor: colors.neutral[800] }}
      >
        <input
          type="text"
          placeholder="Searche for a city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none px-4 py-3 text-neutral-0 placeholder:text-neutral-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center px-4"
        >
          {loading ? (
            <img
              src={loadingIcon}
              alt="loading..."
              className="w-5 h-5 animate-spin"
            />
          ) : error ? (
            <img src={errorIcon} alt="error" className="w-5 h-5 " />
          ) : (
            <img
              src={searchIcon}
              alt="serach"
              className="w-5 h-5 opacity-90 hover:opacity-100"
            />
          )}
        </button>
      </form>
      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default SearchBar;
