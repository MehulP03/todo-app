import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "../style/navbar.css";

export default function TopNavbar() {
  return (
    <>
      <Jumbotron fluid className="jumbo">
        <Container>
          <h1>Fluid jumbotron</h1>
          <p>
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </Container>
      </Jumbotron>
    </>
  );
}
