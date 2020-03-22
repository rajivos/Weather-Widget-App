import React from "react";
import "./App.css";
import { WeatherContextProvider } from "./Components/GlobalContext";
import LocationForm from "./Components/Location-Form";
import Weather from "./Components/Weather";
import "antd/dist/antd.css";

const App= () => {
  return (
    <div className="App">
      <WeatherContextProvider >
        <LocationForm />
        <Weather />
      </WeatherContextProvider>
    </div>
  );
}

export default App;
