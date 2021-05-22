import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import db from "../firebase";
import EditIcon from "@material-ui/icons/Edit";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

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

export default function UpdateModal(props) {
  const [input, setInput] = useState();
  const [open, setOpen] = React.useState(false);
  const [desc, setDesc] = useState();
  const classes = useStyles();

  const updateTodo = (event) => {
    event.preventDefault();
    // update the todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
        disc: desc,
      },
      { merge: true }
    );
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditIcon className="iicon" onClick={handleOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <form className={classes.form}>
              <TextField
                id="standard-basic"
                label="Task"
                placeholder={props.todo.todo}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className={classes.input}
                required
              /><br/>
              <TextField
                  id="double"
                  label="Discription"
                  placeholder="Type Your Discription"
                  value={desc}
                  onChange={(event) => setDesc(event.target.value)}
                  className={classes.input}
                  required
                />
                <br />
              <Button
                className={classes.submit}
                type="submit"
                onClick={updateTodo}
                variant="contained"
                color="primary"
              >
                Update Todo
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
