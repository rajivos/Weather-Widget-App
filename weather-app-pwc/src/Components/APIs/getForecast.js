import axios from "axios";

export const getForecast = (lat, long, unit) => {
  const method = "GET";
  return axios({
    url: `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&key=${process.env.REACT_APP_WEATHER_BIT_KEY}&units=${unit}`,
    method,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*, *"
    },
    adapter: require('axios/lib/adapters/http'), // for jest
  }).then((res) =>  { 
    return res} );
};
