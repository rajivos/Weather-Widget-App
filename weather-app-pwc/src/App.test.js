import { getForecast } from "./Components/APIs/getForecast";
import { getCoordinatesByName } from "./Components/APIs/getCoordinatesByName";

describe("#getForecast() ", () => {
  describe("#getUser() using async/await", () => {
    it("Returns Schedule for given latitude and longitude", async () => {
      await getForecast(-37.805, 144.962, "metric").then(res => {
        const { city_name } = res.data
        expect(res.status).toEqual(200);
        expect(city_name).toEqual("Melbourne");
      });
    });
  });
});

describe("#getCoordinatesByName() ", () => {
  it("Returns coordinates for given name", () => {
    return getCoordinatesByName("Mauritius").then(res => {
      const { formatted } = res.data.results[0]
      expect(res.status).toEqual(200);
      expect(formatted).toEqual("Mauritius");
    });
  });
});
