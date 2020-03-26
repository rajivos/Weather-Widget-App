import React from 'react';
import styled from 'styled-components';

const RowStyle = styled.li`
  margin: 1em 0;
  min-width:100%;

`;

const RowText = styled.span`
color: black;
cursor: pointer;
&:hover {
  color: dodgerblue;
  text-decoration: underline;
}
`

const LocationRow = props => {

  return (
    <RowStyle
      onClick={() => {
          props.onViewClick(props.location.lat, props.location.lng);
          props.toggleLoading(true)
      }}
    >
      <RowText>{props.name}</RowText>
    </RowStyle>
  );
};
  
  
  export default LocationRow;