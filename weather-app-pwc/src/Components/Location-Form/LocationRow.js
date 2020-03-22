import React from 'react';
import styled from 'styled-components';

const RowStyle = styled.div`
  text-decoration: underline;
  color: black;
  cursor: pointer;
  &:hover {
    color: dodgerblue;
  }
`;

const LocationRow = props => {

  return (
    <RowStyle
      onClick={() => {
          props.onViewClick(props.location.lat, props.location.lng );
          props.updateName(props.name)
      }}
    >
      {props.name}
    </RowStyle>
  );
};
  
  
  export default LocationRow;