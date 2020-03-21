import React from "react";

const DayDetails = props => {

  return (
    <React.Fragment>
      {props.dayDetails ? (
        <div>
          <div>Precipitation: {" "}{props.dayDetails.precipitation.precipitation_probability}  %</div>
          <div>Humidity: {" "}{props.dayDetails.relative_humidity} {" "} %</div>
          <div>Wind: {" "}{props.dayDetails.wind.speed.value.toFixed(2)} {" "} kph SW</div>
          <div>Pollen Count:</div>
        </div>
      ) : null}
      </React.Fragment>
  );
};

export default DayDetails;
