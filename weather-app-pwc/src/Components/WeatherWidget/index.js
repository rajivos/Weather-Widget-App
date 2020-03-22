import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import LocationRow from "./Layout/LocationRow";
import WeeksWeatherRow from "./Layout/WeekWeatherRow";
import HeaderDetails from "./Layout/topHeader";
import DayDetails from "./Layout/DayDetails";
import { usePosition } from "use-position";
import { Form, Input, Button, Switch } from "antd";
import "antd/dist/antd.css";

const Wrapper = styled.div``;
const FormWrapper = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin: 5% 0;
  min-height: 20px;
`;
const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const UpperWrapper = styled.div`
  display: inline-flex;
  padding-bottom: 20px;
`;

const DayDetailsWrapper = styled.div`
  width:50%;
  padding-top: 40px;
  padding-right: 50px;
  padding-bottom: 20px;
  min-width: 139px;
  margin-left: auto;

  @media (max-width: 720px) {
    padding-right: 20px;
  }
`;
const WeekWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const method = "GET";

const WeatherWidget = props => {
  const { latitude, longitude } = usePosition();
  const offset = new Date().getTimezoneOffset() / -60;

  const unit = "metric"
  const [stateUnit, setStateUnit] = useState("metric");

  const [stateLatitude, setStatelatitude] = useState(0);
  const [stateLongitude, setStateLongitude] = useState(0);

  const [headerDetails, setHeader] = useState(false);
  // const [isHeaderLoading, setHeaderLoading] = useState(true);

  const [headerData, setHeaderData] = useState(false);
  // const [isHeaderDataLoading, setHeaderDataLoading] = useState(true);

  const [dayDetails, setDayDetails] = useState(false);
  // const [isDayDetailsLoading, setDayDetailsLoading] = useState(true);

  const [weekWeather, setWeekWeather] = useState([]);
  // const [isWeekLoading, setWeekLoading] = useState(true);

  const [locationResults, setLocationResults] = useState([]);

  const getHeader = async (log, lat) => {
    if (log === undefined || lat === undefined) {
      return null;
    }
    return axios({
      url: `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${log}&key=${process.env.REACT_APP_OPENCAGE_KEY}`,
      method
    }).then(res => {
      const { results } = res.data;
      setHeader(results[0].formatted);
      // setHeaderLoading(false);
    });
  };

  const getDayDetails = (log, lat) => {
    if (log === undefined || lat === undefined) {
      return null;
    }
    return axios({
      url: `https://api.breezometer.com/weather/v1/current-conditions?lat=${lat}&lon=${log}&key=${process.env.REACT_APP_BREEZOMETER_KEY}&metadata=true`,
      method
    }).then(res => {
      try {
        const { relative_humidity, precipitation, wind } =
          res.data.data || null;
        setDayDetails({ relative_humidity, precipitation, wind });
      } catch (e) {
        console.log(e)
      }

      // setDayDetailsLoading(false);
    });
  };

  const getSchedule = async (log, lat, unit, offset) => {
    if (log === undefined || lat === undefined) {
      return null;
    }
    
    return axios({
      url: `https://cors-anywhere.herokuapp.com/7timer.info/bin/civillight.php?lon=${log}&lat=${lat}&ac=0&lang=en&unit=${unit}&output=json&tzshift=${offset}`,
      method
    }).then(res => {
      const { dataseries } = res.data;
      setWeekWeather(dataseries);
      setHeaderData(dataseries[0]);
      // setWeekLoading(false);
    });
  };
  useEffect(() => {
    getSchedule(longitude, latitude, unit, offset);
    getHeader( longitude, latitude )
    getDayDetails(longitude, latitude)
  }, [latitude, longitude, unit, offset]);

  const updateView = (long, lat) => {
    getHeader(long, lat);
    getSchedule(long, lat, stateUnit, offset);
    getDayDetails(long,lat)
    setStateLongitude(long);
    setStatelatitude(lat);
  };
  // const setAllLoading = () => {
  //   // setDayDetailsLoading(true);
  //   // setHeaderLoading(true);
  //   // setWeekLoading(true);
  // };

  function findLatandLongByName(locationName) {
    return axios({
      url: `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&key=${process.env.REACT_APP_OPENCAGE_KEY}`,
      method
    }).then(res => {
      setLocationResults(res.data.results);
    });
  }

  const onFinish = values => {
    console.log("Success:", values);
    // setAllLoading(true);
    findLatandLongByName(values.location).then(res => {});
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const Locations = locationResults.map(location => (
    <LocationRow
      key={location.formatted}
      name={location.formatted}
      location={location.geometry}
      onViewClick={updateView}
    />
  ));

  const WeekWeatherDisplay = weekWeather.map(weekDay => (
    <WeeksWeatherRow
      key={weekDay.date}
      date={weekDay.date}
      weather={weekDay.weather}
      temperature={weekDay.temp2m}
    />
  ));

  const onUnitChange = () => {
    if (stateUnit === "metric") {
      setStateUnit("british");
      getSchedule(stateLongitude, stateLatitude, "british", offset);
    } else {
      setStateUnit("metric");
      getSchedule(stateLongitude, stateLatitude, "metric", offset);
    }
  };

  return (
    <Wrapper>
      <FormWrapper name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} >
        <Form.Item label="Location" name="location" rules={[ { required: true, message: "Insert Location!" } ]} >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit"> Submit </Button>
        </Form.Item>
        {locationResults.length > 0 ? <div>{Locations}</div> : null}
      </FormWrapper>
      {/* {headerDetails && <HeaderWrapper><HeaderDetails headerDetails={headerDetails}/></HeaderWrapper>} */}

      <WeatherWrapper>
        <span style={{ padding: "10px" }}>
          Unit:{" "}
          <Switch checkedChildren="metric" unCheckedChildren="British" defaultChecked onChange={() => onUnitChange()} />
        </span>
        <UpperWrapper>
          <HeaderDetails headerDetails={headerDetails} headerData={headerData} unit={stateUnit} />
          <DayDetailsWrapper>
            <DayDetails dayDetails={dayDetails} />
          </DayDetailsWrapper>
        </UpperWrapper>
        {weekWeather ? <WeekWrapper>{WeekWeatherDisplay}</WeekWrapper> : null}
      </WeatherWrapper>
      {""}
    </Wrapper>
  );
};

export default WeatherWidget;
