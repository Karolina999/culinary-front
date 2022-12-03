import React from "react";
import Search from "../../../components/recipe/search";
import { Recipe } from "../../../types";

const Recipes = ({ recipes }: { recipes: Recipe[] }) => {
  return <Search recipes={recipes} />;
};

export async function getStaticProps() {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const res = await fetch("https://localhost:7193/api/Recipe");
  const recipes = await res.json();

  return {
    props: {
      recipes: recipes,
    },
  };
}

export default Recipes;
