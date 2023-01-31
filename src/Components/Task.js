import React, { useState } from "react";
import Card from '@mui/material/Card';
import {Button, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment'

const styles = makeStyles({
    card: {
        margin: '10px',
        padding: '10px',
        
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },  
    title: {
        padding: '6px'
    },
    desc: {
        paddingBottom: '10px'
    },
    input: {
        marginBottom: '10px'
    }
})

const SubTasks = (props) => {
    const { index, updateTask, tasks } = props;
    const [title, setTitle] = useState('')
    const classes = styles()

    const updateStatus = (subTaskIndex) => {
        const tasksCopy = [...tasks]
        const status = tasksCopy[index].subTasks[subTaskIndex].isDone
        tasksCopy[index].subTasks[subTaskIndex].isDone = !status
        if(tasksCopy[index].subTasks.filter(val => val.isDone).length === tasksCopy[index].subTasks.length) {
            tasksCopy[index].isDone = true
        } else if(tasksCopy[index].isDone) {
            tasksCopy[index].isDone = false
        }
        updateTask(tasksCopy)
    }

    const handleEnter =  (e) => {
        if(e.keyCode === 13) {
            const tasksCopy = JSON.parse(JSON.stringify(tasks))
            tasksCopy[index].subTasks.push({
                title: title,
                isDone: false
            })
            setTitle('')
            updateTask(tasksCopy)
        }
    }

    return(
        <div>
            <input className={classes.input} type="text" placeholder="Add subtask" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => handleEnter(e)}/>
            {
                tasks[index].subTasks && tasks[index].subTasks.length > 0 && tasks[index].subTasks.map((subtask, i) => {
                    return(
                        <div className={classes.input} key={`${index}-${i}`}>
                            <input type="checkbox" checked={subtask.isDone} onChange={() => updateStatus(i)}/>
                            <span>{subtask.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

const Tasks = (props) => {
    const { tasks, updateTask } = props;
    const classes = styles();

    const handleComplete = (index) => {
        const tasksCopy = JSON.parse(JSON.stringify(tasks))
        const status = tasksCopy[index].isDone
        tasksCopy[index].isDone = !status
        const endTime = moment()
        const subTasksCopy = tasks[index].subTasks
        if(!status) {
            for(let i=0; i<subTasksCopy.length; i++) {
                subTasksCopy[i].isDone = true
            }
        } else {
            for(let i=0; i<subTasksCopy.length; i++) {
                subTasksCopy[i].isDone = false
            }
        }
        tasksCopy[index].subTasks = subTasksCopy
        tasksCopy[index].timeTaken = status ? '' : moment.duration(endTime.diff(tasksCopy[index].createdOn)).minutes()
        updateTask(tasksCopy)
    }
    
    return (
        <>
        {
            tasks.map((task, i) => {
                return(
                    <Card className={classes.card} key={i}>
                        <div className={classes.header}>
                            <div>
                                <Typography color="primary" className={classes.title}>{task.title} {task.subTasks.length > 0 ? `(${task.subTasks.filter(val=>val.isDone).length}/${task.subTasks.length})` : '' }</Typography>
                                {task.isDone && <Typography>Time Taken - {task.timeTaken > 0 ? `${task.timeTaken} Mins` : 'Less than a min'}</Typography>}
                            </div>
                            <Button onClick={() => handleComplete(i)}>{task.isDone ? 'Completed' : 'Complete'}</Button>
                        </div>
                        <div className={classes.desc}>{task.desc}</div>
                        <SubTasks index={i} updateTask={updateTask} tasks={tasks}/>
                    </Card>
                )
            })
        }
        </>
    )
}

export default Tasks;