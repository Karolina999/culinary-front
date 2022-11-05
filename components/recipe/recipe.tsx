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

const Recipe = () => {
  const star = 3.2;
  const halfStar = !Number.isInteger(star);
  const fillStar = Math.floor(star);
  const regStar = halfStar ? 5 - fillStar - 1 : 5 - fillStar;
  const user = "Jan Kowalski";
  const recipe = {
    title: "Pierogi ruskie",
    time: "2 godz",
    people: 10,
    photo: "/banner.jpg",
    level: 3,
  };
  const steps = [
    {
      stepNumber: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nulla magna, porta non sapien et, lobortis porta massa. Suspendisse ac dignissim leo, eu varius eros. Sed lectus mi, egestas ac auctor id, semper ac nulla. Nullam malesuada ullamcorper nisl a auctor. Donec fermentum fermentum ligula eu facilisis.",
      photo: "",
    },
    {
      stepNumber: 2,
      description:
        "Nulla vitae enim molestie, finibus lorem sit amet, laoreet turpis. Donec ac velit vulputate, convallis ligula ultrices, posuere ipsum. ",
      photo: "",
    },
    {
      stepNumber: 3,
      description:
        " Phasellus mollis, tellus eu luctus molestie, nibh tellus fermentum ipsum, non bibendum sem quam sit amet urna. Nulla ultricies enim sem,",
      photo: "",
    },
  ];
  const products = [
    {
      name: "Łsosoś",
      amount: 3,
      unit: "szczytpa",
    },
    {
      name: "Mąka",
      amount: 5,
      unit: "kg",
    },
    {
      name: "Cukier",
      amount: 1,
      unit: "kg",
    },
    {
      name: "Sól",
      amount: 1,
      unit: "łyżeczka",
    },
  ];
  return (
    <Container className="pt-lg-5">
      <Row>
        <Col xs={12} lg={5} className="d-flex flex-column py-4">
          <div>
            <h1 className="caladea-font display-5 bold mt-auto">
              {recipe.title}
            </h1>
            <p className="text-secondary">Autor: {user}</p>
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
                <p className="my-0">{recipe.level}</p>
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
              {[...Array(fillStar)].map((x) => (
                <FaStar style={{ fontSize: "25px" }} />
              ))}
              {halfStar && <FaStarHalfAlt style={{ fontSize: "25px" }} />}
              {[...Array(regStar)].map((x) => (
                <FaRegStar style={{ fontSize: "25px" }} />
              ))}
              <p className="ps-2 text-dark" style={{ fontSize: "18px" }}>
                {star}/5 z 124 recenzji
              </p>
            </div>
            <div className="pt-2 d-grid gap-2 d-xl-flex">
              <Button variant="danger">
                <CgNotes className="mb-1 me-2" style={{ fontSize: "22px" }} />
                Dodaj do listy
              </Button>
              <Button variant="danger" className="d-inline">
                <BsCalendarPlus
                  className="mb-1 me-2"
                  style={{ fontSize: "22px" }}
                />
                Dodaj do plannera
              </Button>
            </div>
            <div className="pt-2 d-grid gap-2 d-xl-flex">
              <Button variant="danger">
                <BsHeart className="mb-1 me-2" style={{ fontSize: "20px" }} />
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
          {products.map((product) => (
            <div className="d-flex pe-lg-2 pb-1">
              <Col
                xs="auto"
                className="align-self-end me-2"
                style={{ fontWeight: "500" }}
              >
                {product.name}
              </Col>
              <div className="dotted-border align-self-start mb-1"></div>
              <Col
                xs="auto"
                className="align-self-end ms-2 me-xl-4"
                style={{ fontWeight: "500" }}
              >
                {product.amount} {product.unit}
              </Col>
            </div>
          ))}
        </Col>
        <Col className="px-lg-0">
          <h3 className="caladea-font bold mt-auto">Przygotowanie</h3>
          {steps.map((step) => (
            <Row className="pt-3">
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

export default Recipe;
