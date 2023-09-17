import styled from "styled-components";
import React from "react";

const Input=styled.input`
  max-width: 75%;
`
const InputField = ({ className, placeholder, type, value, limit, onChange}) => {
    return (
        <Input className={className} placeholder={placeholder} type={type} value={value} maxLength={limit} onChange={onChange}/>
    )
};

InputField.defaultProps = {
    limit: 255
}

export default InputField;