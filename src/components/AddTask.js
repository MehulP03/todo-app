import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import db from "../firebase";
import firebase from "firebase";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input:{
    width: '500px',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddModal(props) {
  const [input, setInput] = useState();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //this code here.... fires when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will fie off when we click the button
    event.preventDefault(); //will stop the REFRESH
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); //clear up the input after clicking add todo button
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AddCircleOutlinedIcon className="iicon" onClick={handleOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <form className={classes.form}>
              <TextField
                id="standard-basic"
                label="Task"
                placeholder="Add new Task"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className={classes.input}
              /><br/>
              <Button
                className={classes.submit}
                type="submit"
                onClick={addTodo}
                variant="contained"
                color="primary"
              >
                Add Task
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
