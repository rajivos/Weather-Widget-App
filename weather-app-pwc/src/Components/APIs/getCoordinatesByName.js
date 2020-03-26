import axios from "axios";

export const getCoordinatesByName = locationName => {
  const method = "GET";
  return axios({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&key=${process.env.REACT_APP_OPENCAGE_KEY}`,
    method,
    adapter: require('axios/lib/adapters/http'), // for jest
  }).then(res => {
    return res;
  });
};
