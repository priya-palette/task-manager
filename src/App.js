import { useEffect, useState } from "react";
import styled from 'styled-components'
import AddTaskPopup from './Components/AddTaskPopup';
import Snackbar from '@mui/material/Snackbar';
import Tasks from './Components/Task';

const Title = styled.h2`
  font-weight: bold;
  text-align: center;
  color: #0674A0;
`

const Container = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between
`

const Button = styled.button`
  color: #ffffff;
  background-color: #0674A0;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  padding: 3px;
  font-weight: bold;
  height: 32px;
  margin-left: 10px;
`

const SubTitle = styled.h3`
  margin: 0px;
`

const App = () => {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSnackBarOpen, setSnackbarOpen] = useState(false)

  const addTask = (task) => {
    const tasksCopy = JSON.parse(JSON.stringify(tasks))
    tasksCopy.push(task)
    setTasks(tasksCopy)
    setSnackbarOpen(true)
  }

  const removeCompletedTasks = () => {
    const tasksCopy = JSON.parse(JSON.stringify(tasks))
    setTasks(tasksCopy.filter(task => !task.isDone))
  } 


  return (
    <>
    <Title>Greetings!</Title>
    <Title>Manage Your Tasks Here 🤷</Title>
    <Container>
      <SubTitle>Tasks { tasks.length > 0 ? `(${tasks.filter(task => task.isDone).length}/${tasks.length})` : ''}</SubTitle>
      <div>
        {tasks.filter(task => task.isDone).length > 0 && <Button onClick={() => removeCompletedTasks()}>Clear completed tasks</Button>}
        <Button onClick={() => setModalOpen(!isModalOpen)}>Add Task</Button>
      </div>
    </Container>
    <Tasks tasks={tasks} updateTask={setTasks}/>
    {
      isModalOpen && <AddTaskPopup open={isModalOpen} onClose={() => setModalOpen(!isModalOpen)} addTask={addTask}/>
    }
    <Snackbar
        open={isSnackBarOpen}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ 
            vertical: 'top',
            horizontal: 'center'
        }}
        autoHideDuration={1000}
        message="Task added successfully"
      />
    </>
  )
}

export default App;
