import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Recipe } from "../../types";
import RecipeCard from "../recipe/recipeCard";

interface PopularRecipesProps {
  popularRecipes: Recipe[];
}

const PopularRecipes = ({ popularRecipes }: PopularRecipesProps) => {
  return (
    <Container className="py-5">
      <h3 className="caladea-font bold pb-4">Popularne przepisy</h3>
      <Row>
        {popularRecipes.map((recipe) => (
          <Col md={6} lg={4} xl={3} className="pb-3">
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularRecipes;
