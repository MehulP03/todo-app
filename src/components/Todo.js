import React, { useState } from "react";
import {
  Container,
  Button,
  makeStyles,
  Modal,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import db from "../firebase";


const useStyles = makeStyles((theme) => ({
  contain: {
      display: 'flex',
      maxWidth: '1200px',
      flexDirection: 'row',
      justifyContent: 'center'
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    height: "100px",
    width: "300px",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const updateTodo = () => {
    // update the todo with the new input text

    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>I am a model</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            type="submit"
            onClick={updateTodo}
            variant="contained"
            color="primary"
          >
            Update Todo
          </Button>
        </div>
      </Modal>
      <Container className={classes.contain}>
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {props.todo.todo}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Dummy Dedline..
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            image="/img/cardimg.jpg"
            title="Live from space album cover"
          />
        </Card>
      </Container>
    </>
  );
}

export default Todo;
