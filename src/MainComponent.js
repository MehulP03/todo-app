import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import Bottom from "./components/Bottom";
import { Container } from "react-bootstrap";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";

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
  input: {
    width: "500px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Main() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const [desc, setDesc] = useState();
  const [todos, setTodos] = useState([]);
  
  var date = new Date();
  var formatedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`

  // const [input, setInput] = useState("");

  //when the app koads, we need to listen to the database and fetch new todos as the get added/removed
  useEffect(() => {
    //this code here.... fires when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            desc: doc.data().disc,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will fie off when we click the button
    event.preventDefault(); //will stop the REFRESH
    db.collection("todos").add({
      todo: input,
      disc: desc,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); //clear up the input after clicking add todo button
    setDesc("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <TopNavbar/> */}
      <div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Add Task</h5>
            <AddCircleOutlinedIcon
              className="iicon"
              onClick={handleClickOpen}
            />
          </div>
        </div>
        <Dialog
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClickClose}
          open={open}
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
                />
                <br />
                <br />
                <TextField
                  id="double"
                  label="Description"
                  placeholder="Type Your description"
                  value={desc}
                  onChange={(event) => setDesc(event.target.value)}
                  className={classes.input}
                />
                <br />
                <br />
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

      {todos.map((todo) => (
        <Container>
          <Todo todo={todo} desc={desc} />
        </Container>
      ))}

      <Bottom />
    </>
  );
}

export default Main;
