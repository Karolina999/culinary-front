import React, { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { Col, Container, Row } from "react-bootstrap";
import { Recipe } from "../../types";
import Filtr from "./filtr";
import RecipeCard from "./recipeCard";

const Search = ({ recipes, title }: { recipes: Recipe[]; title?: string }) => {
  const [filtrRecipes, setFiltrRecipes] = useState<Recipe[]>([]);
  const [paginationRecipes, setPaginationRecipes] = useState<Recipe[]>([]);
  const [basicFirst, setBasicFirst] = useState(0);
  const [basicRows, setBasicRows] = useState(16);

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
  }, [categories, levels, people]);

  useEffect(() => {
    setPaginationRecipes(
      filtrRecipes.slice(
        basicFirst === 1 ? 0 : basicFirst === 0 ? 0 : basicFirst,
        basicFirst === 0 || basicFirst === 1
          ? basicRows
          : basicFirst + basicRows
      )
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
    <div className="py-5" style={{ minHeight: "92vh" }}>
      <Row className="pb-5">
        <Filtr
          setCategories={setCategories}
          setLevels={setLevels}
          setPeople={setPeople}
          searchTitle={title}
        />
      </Row>

      <Container className="pt-4">
        {filtrRecipes.length > 0 ? (
          <Row>
            {paginationRecipes.map((recipe, index) => (
              <Col md={6} lg={4} xl={3} className="pb-3" key={index}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        ) : (
          <h5 className="py-4 text-center">Nie znaleziono takiego przepisu.</h5>
        )}
        <Row className="pt-2">
          <Paginator
            first={basicFirst}
            rows={basicRows}
            totalRecords={filtrRecipes.length}
            template={template}
            rowsPerPageOptions={[16, 32, 64]}
            onPageChange={onBasicPageChange}
          />
        </Row>
      </Container>
    </div>
  );
};

export default Search;
