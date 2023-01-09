import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import RecipeCard from "../../../components/recipe/recipeCard";
import { getUserWatchedRecipe } from "../../../services/user";

const Watched = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      await getUserWatchedRecipe().then((res) => setRecipes(res));
    };
    fetchRecipes();
  }, []);
  return (
    <Container className="py-5 h-93" style={{ minHeight: "86vh" }}>
      {recipes.length > 0 ? (
        <>
          <h3 className="pb-4 px-2 text-center">Obserwowane przepisy</h3>
          <Row>
            {recipes?.map((recipe, index) => (
              <Col
                md={6}
                lg={4}
                xl={3}
                className="pb-3 d-flex justify-content-center"
                key={index}
              >
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <Row className="text-center">
            <h3 className="bold">Nie obserwujesz żadnych przepisów</h3>
            <h6>
              Aby zaobserwować przepis, wciśnij w przycisk z{" "}
              <BsHeart className="me-2" style={{ fontSize: "15px" }} />
            </h6>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Watched;
