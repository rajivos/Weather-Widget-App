import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Form, Input, Button } from "antd";

import LocationRow from "./LocationRow";
import { WeatherContext } from "../GlobalContext";

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

const LocationForm = props => {
  const WeatherContex = useContext(WeatherContext);

  const Locations = WeatherContex.state.locationResults.map(location => (
    <LocationRow
      key={location.formatted}
      name={location.formatted}
      location={location.geometry}
      onViewClick={WeatherContex.state.updateCoordinates}
      updateName={WeatherContex.state.updateLocation}
      
    />
  ));

  function findLatandLongByName(locationName) {
    const method = "GET";
    return axios({
      url: `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&key=${process.env.REACT_APP_OPENCAGE_KEY}`,
      method
    }).then(res => {
        WeatherContex.state.updateLocationResults(res.data.results);
    });
  }

  const onFinish = values => {
    console.log("Success:", values);
    findLatandLongByName(values.location)
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormWrapper
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Location" name="location" rules={[ { required: true, message: "Insert Location!" } ]} >
        <Input />
      </Form.Item>
      <Form.Item> <Button type="primary" htmlType="submit">
         {" "} Search{" "} </Button> </Form.Item>
      {WeatherContex.state.locationResults.length > 0 ? (
        <div>{Locations}</div>
      ) : null}
    </FormWrapper>
  );
};

export default LocationForm;
