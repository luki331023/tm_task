import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import Checkbox from "./Checkbox";
import axios from "axios";
import React from "react";

const Tr = styled.tr`
  border: 1px solid;
`
const Td = styled.th`
  border: 1px solid;
`

const Task = ({ id, value, state, deleteHandler, stateHandler }) => {
    return (
        <Tr className="border-light">
            <Td className="border-light"><span className="text-light">{id}</span></Td>
            <Td className="border-light"><span className="text-light">{value}</span></Td>
            <Td className="border-light"><Button className="btn-danger" onClick={() => deleteHandler()} name="Delete"/></Td>
            <Td className="border-light">
                <input className="form-check-input checkbox-lg" type="checkbox" checked={state} onChange={(event) => stateHandler(event.currentTarget.checked)}/>
            </Td>
        </Tr>
    );
}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    handleDelete: PropTypes.func,
    state: PropTypes.bool.isRequired
}
export default Task;