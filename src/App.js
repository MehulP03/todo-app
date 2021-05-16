import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
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
      <h1>Hello Todo App ✅!</h1>
      
      <form>
        <FormControl>
          <InputLabel>✅Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
          //<li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;