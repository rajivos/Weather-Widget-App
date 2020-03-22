import React, { useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import { Switch } from "antd";

import { WeatherContext } from "../GlobalContext";

import WeeksWeatherRow from "./WeekWeatherRow";

// const offset = new Date().getTimezoneOffset() / -60;

const WrapperLeft = styled.div`
  margin-right: auto;
`;

const WrapperRight = styled.div`
  padding-right: 200px;
  padding-top: 100px;
  @media (max-width: 720px) {
    padding-right: 0px;
  }
`;

const WrapperBlock = styled.div`
margin:0 auto;
max-width:750px;
width:100%:
`;

const WrapperRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 5px 30px 5px;
`;

const WeekWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Weather = () => {
  const WeatherContex = useContext(WeatherContext);

  const locationName = WeatherContex.state.locationName;

  const latitude = WeatherContex.state.stateLatitude;
  const longitude = WeatherContex.state.stateLongitude;
  const weekWeather = WeatherContex.state.weekWeather;
  const currentConditions = WeatherContex.state.currentConditions;
  const updateCurrentConditions = WeatherContex.state.updateCurrentConditions;
  const updateWeekWeather = WeatherContex.state.updateWeekWeather;
  const metric = WeatherContex.state.metric;

  const switchUnit = WeatherContex.state.switchUnit;

  const getWeekWeather = async (lat, long) => {
    if (!long || !lat) {
      return;
    }
    const method = "GET";
    let unit = "I";
    if (metric) {
      unit = "M";
    }
    axios({
      url: `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&key=${process.env.REACT_APP_WEATHER_BIT_KEY}&units=${unit}`,
      method,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*, *"
      }
    }).then(res => {
      const { data } = res.data;
      updateWeekWeather(data.slice(0, 7));
      updateCurrentConditions({
        precipitation: data[0].pop,
        humidity: data[0].rh,
        wind: data[0].wind_spd,
        windDirection: data[0].wind_cdir,
        description: data[0].weather.description,
        date: data[0].datetime,
        icon: data[0].weather.icon,
        temp: data[0].temp
      });
      console.log(data);
      //   setHeaderData(dataseries[0]);
      // setWeekLoading(false);
    });
  };
  useEffect(
    () => {
      console.log("position updated");
      getWeekWeather(latitude, longitude);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latitude, longitude, metric]
  );

  const WeekWeatherDisplay = weekWeather.map(weekDay => (
    <WeeksWeatherRow
      key={weekDay.datetime}
      date={weekDay.datetime}
      icon={weekDay.weather.icon}
      lowtemperature={weekDay.low_temp}
      maxtemperature={weekDay.max_temp}
    />
  ));

  const TopHeading = props => {
    if (currentConditions) {
      const convertDateToUnix = moment(
        currentConditions.date,
        "YYYY-MM-DD"
      ).unix();
      const formattedDate = moment
        .unix(convertDateToUnix)
        .format("dddd, MMMM Do");
      const icon = `https://www.weatherbit.io/static/img/icons/${currentConditions.icon}.png`;
      return (
        <div>
          {" "}
          <div>
            <h1>{locationName}</h1>
            {formattedDate} <br></br>
            <span style={{ textTransform: "capitalize" }}>
              {currentConditions.description}
            </span>
            <br></br>
            <img
              style={{ height: "80px", width: "80px", verticalAlign: "bottom" }}
              alt="Scattered showers"
              src={icon}
            ></img>
            <span style={{ fontSize: "38px", verticalAlign: "top" }}>
              {currentConditions.temp}{" "}
              {metric ? <span>° C</span> : <span>° F </span>}
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <WrapperBlock>
      {currentConditions ? (
        <WrapperRow>
          <WrapperLeft>
            <Switch
              checkedChildren="Metric"
              unCheckedChildren="British"
              defaultChecked
              onChange={() => switchUnit(!metric)}
            />
            <TopHeading />
          </WrapperLeft>
          <WrapperRight>
            <div>Precipitation: {currentConditions.precipitation}%</div>
            <div>Humitidy: {currentConditions.humidity}%</div>
            <div>
              Wind:{" "}
              {metric ? (
                <span> {(currentConditions.wind * 3.6).toFixed(2)} km/h</span>
              ) : (
                <span> {currentConditions.wind.toFixed(2)}mph </span>
              )}{" "}
              {currentConditions.windDirection}
            </div>
            <br></br>
          </WrapperRight>
        </WrapperRow>
      ) : (
        <div>Loading</div>
      )}
      {weekWeather ? <WeekWrapper>{WeekWeatherDisplay}</WeekWrapper> : null}
    </WrapperBlock>
  );
};

export default Weather;
