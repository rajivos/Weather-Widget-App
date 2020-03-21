import React from "react";
import styled from "styled-components";
import moment from "moment";
import getRelevantIcon from "./IconHandler";

const LocationName = styled.div`
  font-size: 28px;
`;

const TopWeatherHeader = props => {
  const icon = getRelevantIcon(props.headerData.weather);
  const convertDateToUnix = moment(props.headerData.date, "YYYYMMDD").unix();
  const formattedDate = moment.unix(convertDateToUnix).format("dddd, MMMM Do");

  return (
    <div style={{ "paddingLeft": "10px" }}>
      <LocationName>{props.headerDetails}</LocationName>

      {props.headerData ? (
        <div>
          {" "}
          <div> {formattedDate}</div>{" "}
          <div style={{"textTransform": "capitalize"}}>{props.headerData.weather}</div>
          <img
            style={{ height: "48px", width: "48px", verticalAlign: "bottom" }}
            alt="Scattered showers"
            src={icon}
          ></img>
          <span style={{ fontSize: "28px", verticalAlign: "top" }}>
            {props.headerData.temp2m.max}  {props.unit==="metric" ? (<span>° C</span>):(<span>° F </span>)}
          </span>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default TopWeatherHeader;
