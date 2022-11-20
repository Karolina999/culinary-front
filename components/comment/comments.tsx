import React from "react";
import { Container } from "react-bootstrap";
import { UserComment } from "../../types";
import AddComment from "./addComment";
import Comment from "./comment";

const Comments = ({ comments }: { comments: UserComment[] }) => {
  return (
    <Container className="pt-3 pb-5">
      <h3 className="caladea-font bold mt-auto">Recenzje</h3>
      <AddComment />
      {comments.map((comment, index) => (
        <div className="pb-4" key={index}>
          <Comment comment={comment} />
        </div>
      ))}
    </Container>
  );
};

export default Comments;
