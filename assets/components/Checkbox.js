import React from "react";
const Checkbox = ({state }) => {
    return (
        <input className="form-check-input checkbox-lg" type="checkbox" checked={state} />
    );
}

export default Checkbox;