import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { getRecipeComments } from "../../services/comment";
import { UserComment } from "../../types";
import AddComment from "./addComment";
import Comment from "./comment";

const Comments = ({
  comments: initComments,
  recipeId,
}: {
  comments: UserComment[];
  recipeId: number;
}) => {
  const [comments, setComments] = useState(initComments);
  const fetchComments = async () => {
    await getRecipeComments(recipeId).then((res) => setComments(res));
  };
  return (
    <Container className="pt-3 pb-5">
      <h3 className="caladea-font bold mt-auto">Recenzje</h3>
      <AddComment recipeId={recipeId} fetchComments={fetchComments} />
      {comments.map((comment, index) => (
        <div className="pb-4" key={index}>
          <Comment comment={comment} />
        </div>
      ))}
    </Container>
  );
};

export default Comments;
