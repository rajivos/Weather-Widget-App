import React, { useState, useEffect } from "react";
import { usePosition } from "use-position";

const WeatherContext = React.createContext();

const offset = new Date().getTimezoneOffset() / -60;

const WeatherContextProvider = props => {
  const { latitude, longitude } = usePosition();

  const [stateLatitude, setLatitude] = useState(false);
  const [stateLongitude, setLongitude] = useState(false);
  const [metric, setMetric] = useState(true);

  const [locationName, setLocationName] = useState("Current Location");
  const [currentConditions, setCurrentConditions] = useState(false);

  const [weekWeather, setWeekWeather] = useState([]);

  const [locationResults, setLocationResults] = useState([]);

  const [loading, setLoading] = useState([true])
  
  const updateCoordinates = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)
  }

  useEffect(() => {
    setLatitude(latitude);
    setLongitude(longitude);
  }, [latitude, longitude]);

  let state = {
    stateLatitude,
    stateLongitude,
    metric,
    locationName,
    currentConditions,
    weekWeather,
    locationResults,
    offset,
    loading,

    updateLatitude: value => { setLatitude(value); },
    updateLongitude: value => { setLongitude(value); },
    switchUnit: () => { setMetric(!metric); },
    updateLocation: name => { setLocationName(name); },
    updateCurrentConditions: daysConditions => { setCurrentConditions(daysConditions); },
    updateWeekWeather: weekWeather => { setWeekWeather(weekWeather); },
    updateLocationResults: locations => { setLocationResults(locations); },
    updateCoordinates:(latitude, longitude) => {updateCoordinates(latitude, longitude)},
    toggleLoading: ()=> { setLoading(!loading)}
  };

  return (
    <WeatherContext.Provider value={{ state: state }}>
      {props.children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
