import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Comment = () => {
  const user = {
    firstName: "Jan",
    lastName: "Kowalski",
    imageUrl: "",
  };
  const comment = {
    rating: 4,
    commentText: "Lorem ipsum dolor sit",
    date: "4 lutego 2022",
    firstName: "John",
    lastName: "Nowak",
  };
  const star = comment.rating;
  const halfStar = !Number.isInteger(star);
  const fillStar = Math.floor(star);
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
          {[...Array(fillStar)].map((x) => (
            <FaStar style={{ fontSize: "22px" }} />
          ))}
          {halfStar && <FaStarHalfAlt style={{ fontSize: "22px" }} />}
          {[...Array(regStar)].map((x) => (
            <FaRegStar style={{ fontSize: "22px" }} />
          ))}
          <p className="ps-2 text-secondary">
            {comment.firstName} {comment.lastName}
          </p>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie
        euismod risus sed iaculis. Interdum et malesuada fames ac ante ipsum
        primis in faucibus.
      </div>
    </div>
  );
};

export default Comment;
