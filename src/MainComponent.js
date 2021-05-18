import React, { useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import Bottom from "./components/Bottom";
import { Container } from "react-bootstrap";
import AddModal from "./components/AddTask";

function Main() {
  const [todos, setTodos] = useState([]);

  return (
    <>
      {/* <div class="card" style={{width: '18rem'}}>
        <div class="card-body">
          <AddModal />
        </div>
      </div> */}
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
