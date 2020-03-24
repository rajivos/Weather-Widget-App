import React from "react";
import { WeatherContextProvider } from "./Components/GlobalContext";
import LocationForm from "./Components/Location-Form";
import Weather from "./Components/Weather";
import "antd/dist/antd.css";

const App = () => {
  return (
    <React.Fragment>
      <WeatherContextProvider>
        <Weather />
        <LocationForm />
      </WeatherContextProvider>
    </React.Fragment>
  );
};

export default App;
