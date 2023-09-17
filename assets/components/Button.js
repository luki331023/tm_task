import styled from 'styled-components';
import React from "react";

const ButtonName = styled.div`
  width: 100%;
  text-align: center;
  display: block;
`

const StyledButton = styled.button`
  display: flex;
  width: fit-content;
`

const Button = ({ name, className, onClick }) => {
    return (
        <StyledButton className={"btn " + className} type="submit" onClick={onClick}>
            <ButtonName>{name}</ButtonName>
        </StyledButton>
    )
};

export default Button;