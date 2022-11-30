import { Paginator } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import RecipeCard from "../../components/recipe/recipeCard";
import { Recipe } from "../../types";
import Filtr from "../../components/recipe/filtr";

const Recipes = ({ recipes }: { recipes: Recipe[] }) => {
  const [filtrRecipes, setFiltrRecipes] = useState<Recipe[]>([]);
  const [paginationRecipes, setPaginationRecipes] = useState<Recipe[]>([]);
  const [basicFirst, setBasicFirst] = useState(0);
  const [basicRows, setBasicRows] = useState(16);

  const [recipeTitle, setRecipeTitle] = useState("Pomidorowa");
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [people, setPeople] = useState<string[]>([]);

  useEffect(() => {
    let recipesToFiltr = recipes;
    if (categories.length > 0) {
      const filtrCategories = recipesToFiltr.filter((r) =>
        [r.recipeType?.toString()].some((c) => c && categories.includes(c))
      );
      recipesToFiltr = filtrCategories;
    }
    if (levels.length > 0) {
      const filtrLevel = recipesToFiltr.filter((r) =>
        [r.level?.toString()].some((l) => l && levels.includes(l))
      );
      recipesToFiltr = filtrLevel;
    }
    if (people.length > 0) {
      const filtrPeople = recipesToFiltr.filter((r) =>
        [r.people?.toString()].some((p) => p && people.includes(p))
      );
      recipesToFiltr = filtrPeople;
    }
    setFiltrRecipes(recipesToFiltr);
    setBasicFirst(1);
  }, [recipeTitle, categories, levels, people]);

  useEffect(() => {
    setPaginationRecipes(recipes.slice(basicFirst, basicFirst + basicRows));
  }, []);

  useEffect(() => {
    setPaginationRecipes(
      filtrRecipes.slice(basicFirst, basicFirst + basicRows)
    );
  }, [basicFirst, basicRows, filtrRecipes]);

  const onBasicPageChange = (event: any) => {
    setBasicFirst(event.first);
    setBasicRows(event.rows);
  };

  const template = {
    layout:
      "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
    CurrentPageReport: (options: any) => {
      return (
        <span
          style={{
            color: "var(--text-color)",
            userSelect: "none",
            width: "120px",
            textAlign: "center",
          }}
          className={options.totalRecords === 0 ? "text-secondary" : ""}
        >
          {options.first} - {options.last} z {options.totalRecords}
        </span>
      );
    },
  };

  return (
    <div className="py-md-5" style={{ minHeight: "92vh" }}>
      <Row className="pb-5">
        <Filtr
          setCategories={setCategories}
          setLevels={setLevels}
          setPeople={setPeople}
        />
      </Row>

      <Container>
        {filtrRecipes.length > 0 ? (
          <Row>
            {paginationRecipes.map((recipe) => (
              <Col md={6} lg={4} xl={3} className="pb-3">
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="py-4 text-center">Nie znaleziono takiego przepisu.</p>
        )}
        <Row className="pt-2">
          <Paginator
            first={basicFirst}
            rows={basicRows}
            totalRecords={filtrRecipes.length}
            template={template}
            rowsPerPageOptions={[2, 16, 32, 64]}
            onPageChange={onBasicPageChange}
          />
        </Row>
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const res = await fetch("https://localhost:7193/api/Recipe");
  const recipes = await res.json();
  //https://localhost:7193/api/Recipe/includes?title=pomidorowa

  return {
    props: {
      recipes: recipes,
    },
  };
}

export default Recipes;
