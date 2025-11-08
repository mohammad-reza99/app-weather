import Header from "./components/Header";
import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";
import { fonts, colors } from "./styles/styleGuide";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <WeatherProvider>
        <div
          className="min-h-screen w-full flex-flex-col items-center"
          style={{
            backgroundColor: colors.neutral[900],
            color: colors.neutral[0],
            fontFamily: fonts.body,
          }}
        >
          <Header />

          <main className="w-full  grid grid-cols-1 md:grid-cols-[2fr-1fr] gap 10 mt-8 px-6">
            <div className="flex flex-col justify-center items-center w-full">
              <SearchBar />
            </div>
          </main>
        </div>
      </WeatherProvider>
    </>
  );
}

export default App;
