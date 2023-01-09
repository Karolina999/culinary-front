import React from "react";
import Search from "../../../components/recipe/search";
import { Recipe } from "../../../types";

const SearchWithTitle = ({
  recipes,
  title,
}: {
  recipes: Recipe[];
  title: string;
}) => {
  return <Search recipes={recipes} title={title} />;
};

export default SearchWithTitle;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: {
  params: { title: string };
}) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

  const resRecipes = await fetch(
    `https://localhost:7193/api/Recipe/includes?title=${params.title}`
  );
  const recipes = await resRecipes.json();

  return {
    props: {
      recipes: recipes,
      title: params.title,
    },
  };
}
