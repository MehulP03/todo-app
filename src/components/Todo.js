import React, { useState } from "react";
import { Container } from "react-bootstrap";
import db from "../firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import "../style/Todo.css";
import UpdateModal from "./UpdateModal";

function Todo(props) {

  // const [btnText, setbtnText] = useState('Pending');
  // const [textColor, setColor] = useState('#8B0000');

  // const handleBtnChange=()=>{
  //   setbtnText('completed');
  //   setColor('#00FF00');
  // }

  return (
    <>
      <Container>
        <div className="list-group">
          <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h4 className="mb-1">{props.todo.todo}</h4>
              <div className="icons">
                {/* <button style={{ color:{textColor}, borderRadius:'15px'}} onClick={handleBtnChange} type="button" class="btn btn-info">{btnText}</button> */}
                <UpdateModal todo={props.todo} desc={props.desc} />
                <DeleteIcon
                  className="icon"
                  onClick={(event) =>
                    db.collection("todos").doc(props.todo.id).delete()
                  }
                />
              </div>
            </div>
            <p className="mb-1">
              {props.todo.desc}
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Todo;
