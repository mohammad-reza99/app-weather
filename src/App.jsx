import Header from "./components/Header";
import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";
import { fonts, colors } from "./styles/styleGuide";

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
        </div>
      </WeatherProvider>
    </>
  );
}

export default App;
