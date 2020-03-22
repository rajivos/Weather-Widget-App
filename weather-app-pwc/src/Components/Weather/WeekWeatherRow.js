import React from "react";
import styled from "styled-components";
import moment from "moment";

const Wrapper = styled.div`
  min-width: 100px;
  min-height: 100px;
  box-sizing: border-box;
  padding: 0 15px;
  padding-bottom: 10px;
  &:hover {
    // box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Date = styled.span`
font-weight:bold;
 text-align:center;
  }
`;

const TemperatureContainer = styled.div`

`
const TemperatureMax = styled.span`
padding-right:5px;
color: #878787 !important;
  } 
`;

const TemperatureMin = styled.span`
color: #bababa !important;
  }
`;

// const PollenWrapper = styled.span`
// color: #bababa !important;
//   }
// `;

const WeeksWeatherRow = props => {
  const formattedDate2 = moment(props.date, "YYYY-MM-DD").unix();
  const dateDayFormat = moment(moment.unix(formattedDate2)).isSame(moment(), "day")
    ? "Today"
    : moment.unix(formattedDate2).format("dddd");


    
  const icon = `https://www.weatherbit.io/static/img/icons/${props.icon}.png`

  return (
    <Wrapper>
      <Date>{dateDayFormat}</Date>
      <div><img style={{"height":"48px","width":"48px"}} alt="Scattered showers" src={icon}></img></div>
      <TemperatureContainer>
      <TemperatureMax>{props.maxtemperature}°</TemperatureMax>
      <TemperatureMin>{props.lowtemperature}°</TemperatureMin>
      </TemperatureContainer>
      {/* <PollenWrapper>Pollen:  </PollenWrapper> */}
    </Wrapper>
  );
};

export default WeeksWeatherRow;
