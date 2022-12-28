import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { UserComment } from "../../types";

interface CommentProps {
  comment: UserComment;
}

const Comment = ({ comment }: CommentProps) => {
  const star = comment.rating;
  const halfStar = !Number.isInteger(star);
  const fillStar = Math.floor(star ? star : 0);
  const regStar = halfStar ? 5 - fillStar - 1 : 5 - fillStar;
  return (
    <div className="d-flex">
      <div>
        <img
          src={comment.user?.photo ? comment.user?.photo : "/user.jpg"}
          className="shadow me-3"
          style={{ height: "90px", width: "90px", objectFit: "cover" }}
        />
      </div>
      <div>
        <div className="d-flex text-warning" style={{ alignItems: "start" }}>
          {[...Array(fillStar)].map((x, index) => (
            <FaStar style={{ fontSize: "22px" }} key={index} />
          ))}
          {halfStar && <FaStarHalfAlt style={{ fontSize: "22px" }} />}
          {[...Array(regStar)].map((x, index) => (
            <FaRegStar style={{ fontSize: "22px" }} key={index} />
          ))}
          <p className="ps-2 text-secondary">
            {comment.user?.firstName} {comment.user?.lastName}
          </p>
        </div>
        {comment.commentText}
      </div>
    </div>
  );
};

export default Comment;
