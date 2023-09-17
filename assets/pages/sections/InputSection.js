import InputField from "../../components/InputField";
import Button from "../../components/Button";
import styled from "styled-components";
import React, {useState} from "react";


const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`

const Wrapper = styled.div`
    padding: 50px 0 25px 0;
`

const InputSection = ({ handleSubmit }) => {
    const [taskName, setTaskName] = useState("")

    return (
        <Wrapper>
            <Form>
                <InputField className="form-control" placeholder="Task description" type="text" onChange={(event) => setTaskName(event.currentTarget.value)}/>
                <Button name="Save Task" className="btn-success" onClick={() => handleSubmit(taskName)}/>
            </Form>
        </Wrapper>
    );
};
export default InputSection;