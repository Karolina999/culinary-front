import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button, Spinner } from "react-bootstrap";
import RecipeCard from "../../../components/recipe/recipeCard";
import { getUserRecipes } from "../../../services/user";

const index = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecipes = async () => {
      await getUserRecipes().then((res) => setRecipes(res));
      setLoading(false);
    };
    fetchRecipes();
  }, []);
  return (
    <Container className="py-5 h-93" style={{ minHeight: "86vh" }}>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="success" className="my-5" />
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <>
              <h3 className="pb-4 px-2 text-center">Moje przepisy</h3>
              <Row>
                {recipes?.map((recipe, index) => (
                  <Col
                    md={6}
                    lg={4}
                    xl={3}
                    className="pb-3 d-flex justify-content-center"
                    key={index}
                  >
                    <RecipeCard recipe={recipe} buttonToEdit />
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
                <h3 className="bold">Nie stworzyłeś żadnych przepisów</h3>
                <h6>
                  Chcesz dodać przepis?
                  <Button
                    variant="link"
                    onClick={() => (window.location.href = "/przepisy/dodaj")}
                  >
                    Kliknij!
                  </Button>
                </h6>
              </Row>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default index;
