import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { UserComment } from "../../types";

interface CommentProps {
  comment: UserComment;
}

const Comment = ({ comment }: CommentProps) => {
  const user = {
    firstName: "Jan",
    lastName: "Kowalski",
    imageUrl: "",
  };
  const star = comment.rating;
  const halfStar = !Number.isInteger(star);
  const fillStar = Math.floor(star ? star : 0);
  const regStar = halfStar ? 5 - fillStar - 1 : 5 - fillStar;
  return (
    <div className="d-flex">
      <div>
        <img
          src={user.imageUrl.length > 0 ? user.imageUrl : "/user.jpg"}
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
            {user.firstName} {user.lastName}
          </p>
        </div>
        {comment.commentText}
      </div>
    </div>
  );
};

export default Comment;
