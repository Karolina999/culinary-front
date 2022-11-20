import React from "react";
import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  BsFillAlarmFill,
  BsFillPersonFill,
  BsCalendarPlus,
  BsHeart,
} from "react-icons/bs";
import { AiFillSignal } from "react-icons/ai";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { ProductFromRecipe, RatingDto, Recipe, Step, User } from "../../types";
import { UnitPluar } from "../../frontType/unit";

interface RecipeComponentProps {
  recipe: Recipe;
  steps: Step[];
  rating: RatingDto;
  author: User;
  products: ProductFromRecipe[];
}

const RecipeComponent = ({
  recipe,
  steps,
  rating,
  author,
  products,
}: RecipeComponentProps) => {
  const star = rating.rating;
  const halfStar = !Number.isInteger(star);
  const fillStar = Math.floor(star ? star : 0);
  const regStar = halfStar ? 5 - fillStar - 1 : 5 - fillStar;
  return (
    <Container className="pt-lg-5">
      <Row>
        <Col xs={12} lg={5} className="d-flex flex-column py-4">
          <div>
            <h1 className="caladea-font display-5 bold mt-auto">
              {recipe.title}
            </h1>
            <p className="text-secondary">
              Autor: {author.firstName} {author.lastName}
            </p>
          </div>
          <div className="mt-auto">
            <div className="pb-3" style={{ fontSize: "18px" }}>
              <div className="d-flex my-0">
                <BsFillAlarmFill
                  style={{ fontSize: "22px" }}
                  className="me-2 mb-0 mt-1"
                />
                <p className="my-0">{recipe.time}</p>
              </div>
              <div className="d-flex my-0">
                <AiFillSignal
                  style={{ fontSize: "22px" }}
                  className="me-2 mb-0 mt-1"
                />
                <p className="my-0">
                  {recipe.level === 0
                    ? "łatwy"
                    : recipe.level === 1
                    ? "średni"
                    : "trundy"}
                </p>
              </div>
              <div className="d-flex my-0">
                <BsFillPersonFill
                  style={{ fontSize: "23px" }}
                  className="me-2 mb-0 mt-1"
                />
                <p className="my-0">{recipe.people} osób</p>
              </div>
            </div>
            <div
              className="d-flex text-warning "
              style={{ alignItems: "start" }}
            >
              {[...Array(fillStar)].map((x, index) => (
                <FaStar style={{ fontSize: "25px" }} key={index} />
              ))}
              {halfStar && <FaStarHalfAlt style={{ fontSize: "25px" }} />}
              {[...Array(regStar)].map((x, index) => (
                <FaRegStar style={{ fontSize: "25px" }} key={index} />
              ))}
              <p className="ps-2 text-dark" style={{ fontSize: "18px" }}>
                {star}/5 z {rating.numberOfReviews} recenzji
              </p>
            </div>
            <div className="pt-2 d-grid gap-2 d-xl-flex">
              <Button
                variant="danger"
                style={{ paddingTop: "11px", paddingBottom: "11px" }}
              >
                <CgNotes className="mb-1 me-2" style={{ fontSize: "22px" }} />
                Dodaj do listy
              </Button>
              <Button
                variant="danger"
                className="d-inline"
                style={{ paddingTop: "11px", paddingBottom: "11px" }}
              >
                <BsCalendarPlus
                  className="mb-1 me-2"
                  style={{ fontSize: "22px" }}
                />
                Dodaj do plannera
              </Button>
            </div>
            <div className="pt-2 d-grid gap-2 d-xl-flex">
              <Button
                variant="danger"
                style={{ paddingTop: "11px", paddingBottom: "11px" }}
              >
                <BsHeart className="me-2" style={{ fontSize: "20px" }} />
                Dodaj do ulubionych
              </Button>
            </div>
          </div>
        </Col>
        <Col
          style={
            recipe.photo
              ? { minHeight: "400px", position: "relative" }
              : { position: "relative" }
          }
          xs={{ order: "first" }}
          lg={{ order: "last" }}
        >
          <Image
            src={
              recipe.photo && recipe.photo.length > 0
                ? recipe.photo
                : "/recipe.jpg"
            }
            alt="Picture of the author"
            layout="fill"
            style={{ objectFit: "cover" }}
            className={recipe.photo || "d-none d-lg-flex"}
          />
        </Col>
      </Row>
      <Row className="pt-4 mt-lg-3">
        <Col xs={12} lg={5} className="pb-4 pb-lg-0 pe-xl-5">
          <h3 className="caladea-font bold mt-auto">Składniki</h3>
          {products.map((product, index) => (
            <div className="d-flex pe-lg-2 pb-1" key={index}>
              <Col
                xs="auto"
                className="align-self-end me-2"
                style={{ fontWeight: "500" }}
              >
                {product.ingredient?.name}
              </Col>
              <div
                className="dotted-border align-self-start"
                style={{ marginBottom: "7px" }}
              ></div>
              <Col
                xs="auto"
                className="align-self-end ms-2 me-xl-4"
                style={{ fontWeight: "500" }}
              >
                {/* {product.ingredient?.amount} {UnitPluar(product.ingredient.amount, (product.ingredient.unit)} */}
                {product.unit && UnitPluar(1, product.unit)}
              </Col>
            </div>
          ))}
        </Col>
        <Col className="px-lg-0">
          <h3 className="caladea-font bold mt-auto">Przygotowanie</h3>
          {steps.map((step, index) => (
            <Row className="pt-3" key={index}>
              <Col xs={12} lg={step.photo ? 8 : 12}>
                <h5>Krok {step.stepNumber}</h5>
                <p>{step.description}</p>
              </Col>
              {step.photo && (
                <Col style={{ position: "relative", minHeight: "200px" }}>
                  <Image
                    src={step.photo}
                    alt="Picture of the author"
                    layout="fill"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
              )}
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeComponent;
