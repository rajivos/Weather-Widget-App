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

const LocationRow = props => (
      <RowStyle onClick={()=>{props.onViewClick(props.location.lng, props.location.lat )}}>{props.name}</RowStyle>
  );
  
  
  export default LocationRow;