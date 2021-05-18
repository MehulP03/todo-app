import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import db from "./firebase";
import Bottom from "./components/Bottom";
import { Container } from "react-bootstrap";
import AddModal from './components/AddTask';

function Main() {
  const [todos, setTodos] = useState([]);
  // const [input, setInput] = useState("");

  //when the app koads, we need to listen to the database and fetch new todos as the get added/removed
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

  return (
    <>
      {/* <TopNavbar/> */}
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Add Task</h5>
          <AddModal/>
        </div>
      </div>
      {todos.map((todo) => (
        <Container>
          <Todo todo={todo} />
        </Container>
      ))}

      <Bottom />
    </>
  );
}

export default Main;