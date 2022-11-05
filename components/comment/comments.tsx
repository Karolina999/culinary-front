import React from "react";
import { Container } from "react-bootstrap";
import AddComment from "./addComment";
import Comment from "./comment";

const Comments = () => {
  return (
    <Container className="pt-3 pb-5">
      <h3 className="caladea-font bold mt-auto">Recenzje</h3>
      <AddComment />
      <Comment />
    </Container>
  );
};

export default Comments;
