import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment'

const styles = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: 400
    },
    title: {
        marginBottom: '10px !important',
        marginTop: '5px !important'
    }
})


const Title = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

Title.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const AddTaskPopup = (props) => {
    const { open, onClose, addTask } = props
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const classes = styles()

    const handleAddTask = () => {
        addTask({            
            title: title,
            desc: desc,
            isDone: false,
            subTasks: [],
            createdOn: moment()
        })
        onClose();
    }

  return (
    <div>
      <Dialog
        onClose={onClose}
        open={open}
      >
        <Title onClose={onClose}>
          Here you go!
        </Title>
        <DialogContent className={classes.content}>
          <TextField className={classes.title} onChange ={(e) => setTitle(e.target.value)} variant="outlined" label="Title" value={title}/>
          <TextField rows={3} onChange ={(e) => setDesc(e.target.value)} multiline variant="outlined" value ={desc} label="Description"/>
        </DialogContent>
        <DialogActions>
          <Button disabled={title.length === 0} onClick={() => handleAddTask()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTaskPopup;