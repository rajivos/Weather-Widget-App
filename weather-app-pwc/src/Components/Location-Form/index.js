import React, { useContext } from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import LocationRow from "./LocationRow";
import { WeatherContext } from "../GlobalContext";

import { getCoordinatesByName } from "../APIs/getCoordinatesByName"

const Wrapper = styled.div`
margin:20px auto;
padding:20px;
width:100%;
max-width:400px;

@media (max-width: 520px) {
  flex-direction:column;
  padding:5px;

}
`;

const FormWrapper = styled(Form)`
display:flex;
flex-direction:row;

@media (max-width: 520px) {
  flex-direction:column;
}
`
const LocationInput = styled(Input)`
`

const LocationResultWrapper = styled.div``;

const UlWrapper = styled.ul`
list-style-type:decimal;
padding: 0 15px;
margin:0;
`;

const ButtonContainer = styled.div`
margin-left:auto
`

const ButtonWrapper = styled(Button)`

`

const LocationForm = () => {
  const WeatherContex = useContext(WeatherContext);

  const Locations = WeatherContex.state.locationResults.map(location => (
    <LocationRow
      key={location.formatted}
      name={location.formatted}
      location={location.geometry}
      onViewClick={WeatherContex.state.updateCoordinates}
      toggleLoading={WeatherContex.state.toggleLoading}
    />
  ));

  function findLatandLongByName(locationName) {
    return getCoordinatesByName(locationName).then(res => {
      WeatherContex.state.updateLocationResults(res.data.results);
    });
  }

  const onFinish = values => {
    findLatandLongByName(values.location);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Wrapper>
      <FormWrapper
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Location:"
          name="location"
          rules={[{ required: true, message: "Insert Location!" }]}
        >
          <LocationInput type="text" />
        </Form.Item>
        <ButtonContainer>
          <ButtonWrapper type="primary" htmlType="submit">
            Search
          </ButtonWrapper>
          </ButtonContainer>
      </FormWrapper>
      <LocationResultWrapper>
        {WeatherContex.state.locationResults.length > 0 ? (
          <UlWrapper>{Locations}</UlWrapper>
        ) : null}
      </LocationResultWrapper>
    </Wrapper>
  );
};

export default LocationForm;
