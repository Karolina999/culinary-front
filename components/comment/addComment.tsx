import { Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Rating } from "primereact/rating";
import { getUser } from "../../services/user";
import { UserDto } from "../../types";
import { postComment } from "../../services/comment";

const AddComment = ({
  recipeId,
  fetchComments,
}: {
  recipeId: number;
  fetchComments: () => {};
}) => {
  const [user, setUser] = useState<UserDto>({});
  const [error, setError] = useState("");

  const getUserData = async () => {
    await getUser().then((res) => {
      setUser(res);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="pt-3 pb-4 d-flex">
      <div>
        <img
          src={user?.imageUrl ? user.imageUrl : "/user.jpg"}
          className="shadow me-3"
          style={{ height: "90px", width: "90px", objectFit: "cover" }}
        />
      </div>
      <div className="w-100">
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={yup.object().shape({
            rating: yup.number().min(1, "Oceń przepis od 1 do 5"),
            commentText: yup.string().required("Napisz komentarz"),
          })}
          onSubmit={async (values) => {
            await postComment(user.id!, recipeId, values)
              .then(async () => {
                await fetchComments();
                values.rating = 0;
                values.commentText = "";
              })
              .catch(() => setError("Nie możesz ponownie dodać komentarza"));
          }}
          initialValues={{
            rating: 0,
            commentText: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form onSubmit={handleSubmit}>
              <div className="text-warning">
                <Rating
                  cancel={false}
                  name="rating"
                  value={values.rating}
                  onChange={handleChange}
                  onIcon={<FaStar style={{ fontSize: "22px" }} />}
                  offIcon={<FaRegStar style={{ fontSize: "22px" }} />}
                />
                <small className="pt-2 text-danger">{errors.rating}</small>
              </div>

              <div style={{ width: "98%", display: "block" }}>
                <Col xs={12}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="my-2 w-100"
                    onChange={handleChange}
                    name="commentText"
                    value={values.commentText}
                    isInvalid={!!errors.commentText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.commentText}
                  </Form.Control.Feedback>
                  <small className="pt-2 text-danger">{error}</small>
                  <div className="d-flex">
                    <OverlayTrigger
                      placement="left"
                      overlay={
                        user ? (
                          <></>
                        ) : (
                          <Tooltip>Zaloguj się aby skomentować</Tooltip>
                        )
                      }
                    >
                      <span className="d-inline-block ms-auto">
                        <Button variant="danger" disabled={!user} type="submit">
                          Skomentuj
                        </Button>
                      </span>
                    </OverlayTrigger>
                  </div>
                </Col>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddComment;
