import React, { useEffect, useState } from 'react';
import Todo from './components/Todo';
import { Button, Modal, makeStyles } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import Bottom from './components/Bottom';
import Navbar from './components/Navbar';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));


function Main() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  //when the app koads, we need to listen to the database and fetch new todos as the get added/removed
  useEffect(() => {
    //this code here.... fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    //this will fie off when we click the button
    event.preventDefault(); //will stop the REFRESH

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setInput(''); //clear up the input after clicking add todo button
  }

  return (
    <div className="App">
      <Navbar/>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
        <h1>I am a model</h1>
        <input
            placeholder="write toda here"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
          </div>          
      </Modal>
  <AddCircleIcon fontSize="large" onClick={e =>setOpen(true)} />

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>

      <Bottom/>
    </div>
  );
}

export default Main;