import styled from "styled-components";
import TaskSection from "./sections/TaskSection";
import React from "react";

const Wrapper = styled.div`
  max-width: 1150px;
  margin: 0 auto;
`
const MainPage = () => {
    return (
        <>
            <Wrapper>
                <TaskSection/>
            </Wrapper>
        </>
    )
};

export default MainPage;