import React from "react";
import {
  Form,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const AddComment = () => {
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
    <div className="pt-3 pb-4 d-flex">
      <div>
        <img
          src={user.imageUrl.length > 0 ? user.imageUrl : "/user.jpg"}
          className="shadow me-3"
          style={{ height: "90px", width: "90px", objectFit: "cover" }}
        />
      </div>
      <div className="w-100">
        <Form>
          <div className="d-flex text-warning" style={{ alignItems: "start" }}>
            {[...Array(fillStar)].map((x, index) => (
              <FaStar style={{ fontSize: "22px" }} key={index} />
            ))}
            {halfStar && <FaStarHalfAlt style={{ fontSize: "22px" }} />}
            {[...Array(regStar)].map((x, index) => (
              <FaRegStar style={{ fontSize: "22px" }} key={index} />
            ))}
          </div>
          <div style={{ width: "98%", display: "block" }}>
            <Col xs={12}>
              <Form.Control
                as="textarea"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                rows={3}
                className="my-2 w-100"
              />
              <div className="d-flex">
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip>Zaloguj się aby skomentować</Tooltip>}
                >
                  <span className="d-inline-block ms-auto">
                    <Button variant="danger" disabled>
                      Skomentuj
                    </Button>
                  </span>
                </OverlayTrigger>
              </div>
            </Col>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddComment;
