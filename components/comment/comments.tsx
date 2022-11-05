import React from "react";
import { Container } from "react-bootstrap";
import Comment from "./comment";

const Comments = () => {
  return (
    <Container className="pt-3">
      <p>Dodaj kome</p>
      <Comment />
    </Container>
  );
};

export default Comments;
