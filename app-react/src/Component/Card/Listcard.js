import React from 'react';
// import Card from './Card';
import styled from 'styled-components';

const StyledCardList = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 90px 30px;
    padding: 40px;
`

const Listcard = (props) => {
    return (
        <StyledCardList>{props.children}</StyledCardList>
    );
};

export default Listcard;