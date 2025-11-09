import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherMain from "./components/WeatherMain";
import HourlyForecast from "./components/HourlyForecast";
import { WeatherProvider } from "./context/WeatherContext";
import { colors, fonts } from "./styles/styleGuide";

function App() {
  return (
    <WeatherProvider>
      <div
        className="min-h-screen w-full flex flex-col items-center"
        style={{
          backgroundColor: colors.neutral[900],
          color: colors.neutral[0],
          fontFamily: fonts.body,
        }}
      >
        <Header />

        <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 mt-10 px-6">
          <div className="flex flex-col items-center w-full">
            <SearchBar />
            <div className="mt-8 w-full flex flex-col items-center">
              <WeatherMain />
            </div>
          </div>

          <HourlyForecast />
        </main>
      </div>
    </WeatherProvider>
  );
}

export default App;
