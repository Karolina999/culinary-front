import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  BsFillAlarmFill,
  BsFillPersonFill,
  BsCalendarPlus,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { AiFillSignal } from "react-icons/ai";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { ProductFromRecipe, RatingDto, Recipe, Step, User } from "../../types";
import { UnitPluar } from "../../utils/unit";
import { Level } from "../../utils/level";
import { polishPlural } from "../../utils/polishPlural";
import {
  deleteWatchedRecipe,
  isWatched,
  postWatchedRecipe,
} from "../../services/watchedRecipe";
import { Toast } from "primereact/toast";
import { postShoppingList } from "../../services/shoppingList";
import { postProductsFromList } from "../../services/productFromList";

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
  const toast = useRef<any>(null);
  const star = rating.rating;
  const halfStar = !Number.isInteger(star);
  const fillStar = Math.floor(star ? star : 0);
  const regStar = halfStar ? 5 - fillStar - 1 : 5 - fillStar;
  const [isWatchedRecipe, setIsWatchedRecipe] = useState(false);

  useEffect(() => {
    const isRecipeWatched = async () => {
      await isWatched(recipe.id!)
        .then(() => {
          setIsWatchedRecipe(false);
        })
        .catch(() => {
          setIsWatchedRecipe(true);
        });
    };
    isRecipeWatched();
  }, []);
  return (
    <Container className="pt-lg-5">
      <Toast ref={toast} />
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
                <div style={{ width: "30px" }}>
                  <BsFillAlarmFill
                    style={{ fontSize: "22px" }}
                    className="me-2 mb-1"
                  />
                </div>
                <p className="my-0">{recipe.time}</p>
              </div>
              <div className="d-flex my-0">
                <div style={{ width: "30px" }}>
                  <AiFillSignal
                    style={{ fontSize: "22px" }}
                    className="me-2 mb-1"
                  />
                </div>
                <p className="my-0">{Level[recipe.level ? recipe.level : 0]}</p>
              </div>
              <div className="d-flex my-0">
                <div style={{ width: "30px" }}>
                  <BsFillPersonFill
                    style={{ fontSize: "23px" }}
                    className="me-2 mb-1"
                  />
                </div>
                <p className="my-0">
                  {recipe.people}{" "}
                  {polishPlural(
                    "osoba",
                    "osoby",
                    "osób",
                    recipe.people ? recipe.people : 0
                  )}
                </p>
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
                {star?.toFixed(1)}/5 z {rating.numberOfReviews} recenzji
              </p>
            </div>
            <div className="pt-2 d-grid gap-2 d-xl-flex">
              <Button
                variant="danger"
                style={{ paddingTop: "11px", paddingBottom: "11px" }}
                onClick={async () => {
                  const date = new Date();
                  const title = `${recipe.title} - ${date
                    .toJSON()
                    .slice(0, 10)
                    .replaceAll("-", "/")}`;
                  await postShoppingList({ title: title })
                    .then(async (res) => {
                      const protuctsToAdd = products.map((p) => {
                        return {
                          unit: p.unit,
                          amount: p.amount,
                          ingredientId: p.ingredientId,
                        };
                      });
                      await postProductsFromList(protuctsToAdd, res.id)
                        .then(() => {
                          toast.current.show({
                            severity: "success",
                            summary: "Powodzenie",
                            detail: "Lista została utworzona",
                            life: 3000,
                          });
                        })
                        .catch(() => {
                          toast.current.show({
                            severity: "error",
                            summary: "Błąd",
                            detail: "Nie udało się stworzyć listy",
                            life: 3000,
                          });
                        });
                    })
                    .catch(() => {
                      toast.current.show({
                        severity: "error",
                        summary: "Błąd",
                        detail: "Nie udało się stworzyć listy",
                        life: 3000,
                      });
                    });
                }}
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
              {isWatchedRecipe ? (
                <Button
                  variant="danger"
                  style={{ paddingTop: "11px", paddingBottom: "11px" }}
                  onClick={async () => {
                    await deleteWatchedRecipe(recipe.id!)
                      .then(() => {
                        toast.current.show({
                          severity: "success",
                          summary: "Powodzenie",
                          detail: "Produkt został usunięty z obserwowanych",
                          life: 3000,
                        });
                        setIsWatchedRecipe(!isWatchedRecipe);
                      })
                      .catch(() => {
                        toast.current.show({
                          severity: "error",
                          summary: "Błąd",
                          detail: "Produkt nie został usunięty z obserwowanych",
                          life: 3000,
                        });
                      });
                  }}
                >
                  <BsHeartFill className="me-2" style={{ fontSize: "20px" }} />
                  Usuń z ulubionych
                </Button>
              ) : (
                <Button
                  variant="danger"
                  style={{ paddingTop: "11px", paddingBottom: "11px" }}
                  onClick={async () => {
                    await postWatchedRecipe(recipe.id!)
                      .then(() => {
                        toast.current.show({
                          severity: "success",
                          summary: "Powodzenie",
                          detail: "Produkt został dodany do obserwowanych",
                          life: 3000,
                        });
                        setIsWatchedRecipe(!isWatchedRecipe);
                      })
                      .catch((err) => {
                        toast.current.show({
                          severity: "error",
                          summary: "Błąd",
                          detail: "Produkt nie został dodany do obserwowanych",
                          life: 3000,
                        });
                      });
                  }}
                >
                  <BsHeart className="me-2" style={{ fontSize: "20px" }} />
                  Dodaj do ulubionych
                </Button>
              )}
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
                {product.amount}{" "}
                {UnitPluar(
                  product.amount ? product.amount : 0,
                  product.unit || 0
                )}
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
