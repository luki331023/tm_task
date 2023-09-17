import styled from "styled-components";
import Task from "../../components/Task";
import {useEffect, useState} from "react";
import axios from "axios";
import InputSection from "./InputSection";
import React from "react";

const Table = styled.table`
  width: 100%;
  margin-bottom: 50px;
`

const Tr = styled.tr`
  border: 1px solid;
`

const Th = styled.th`
  border: 1px solid;
`
const TaskSection = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get("/api/tasks")
            .then(response => {setTasks(response.data)})
            .catch(error => console.log(error))
    }, [])

    const onCheckboxStateChange = (task, state) => {
        axios.patch("/api/tasks/" + task.id, {
            id: task.id,
        })
            .then(response => {
                setTasks((prevState) => {
                    return prevState.map((t) => {
                        if (t.id === task.id) {
                            t.completed = state;
                        }
                        return t;
                    })
                })
            })
            .catch(error => console.log(error))
    }

    const onDelete = (task) => {
        axios.delete("api/tasks/" + task.id)
            .then(response => {
                setTasks((prevState) => {
                    return prevState.filter((t) => t.id !== task.id)
                })
            })
            .catch(error => console.log(error))
    }
    const handleSubmit = (taskName) => {
        axios.post("/api/tasks", {description: taskName})
            .then(response => {
                setTasks((prevState) => {
                    return [...prevState, response.data];
                })
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <InputSection handleSubmit={(taskName) => handleSubmit(taskName)}/>
            <Table>
                <Tr className="border-light">
                    <Th className="border-light"><span className="text-light">ID</span></Th>
                    <Th className="border-light"><span className="text-light">Task description</span></Th>
                    <Th className="border-light"><span className="text-light">Delete</span></Th>
                    <Th className="border-light"><span className="text-light">Completed</span></Th>
                </Tr>
                {tasks.map(task => {
                    return (
                        <Task id={task.id} value={task.description} state={task.completed}
                            deleteHandler={() => onDelete(task)}
                            stateHandler={(state) => onCheckboxStateChange(task, state)}
                        />
                    )
                })}
            </Table>
        </>
    );
};

export default TaskSection;