import React from "react";
import { Container } from "react-bootstrap";
import db from "../firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import "../style/Todo.css";
import UpdateModal from "./UpdateModal";
import Switch from "@material-ui/core/Switch";
import { FormControlLabel } from "@material-ui/core";

function Todo(props) {

  return (
    <>
      <Container>
        <div className="list-group">
          <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h4 className="mb-1">{props.todo.todo}</h4>
              <div className="icons">
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      className="switch"
                    />
                  }
                />
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
