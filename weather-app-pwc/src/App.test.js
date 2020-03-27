import { getForecast } from "./Components/APIs/getForecast";
import { getCoordinatesByName } from "./Components/APIs/getCoordinatesByName";

describe("#getCoordinatesByName() ", () => {
  it("Returns coordinates for given name", () => {
     getCoordinatesByName("Mauritius").then(res => {
      const { formatted } = res.data.results[0]
      expect(res.status).toEqual(200);
      expect(formatted).toEqual("Mauritius");
    });
  });
});

describe("#getForecast() ", () => {
    it("Returns Schedule for given latitude and longitude",() => {
      getForecast(-37.805, 144.962, "metric").then(res => {
        const { city_name } = res.data
        expect(res.status).toEqual(200);
        expect(city_name).toEqual("Melbourne");
      });
    });
});




