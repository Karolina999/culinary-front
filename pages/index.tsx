import React from "react";
import Banner from "../components/homePage/banner";
import Category from "../components/homePage/category";
import PopularRecipes from "../components/homePage/popularRecipes";
import { Recipe } from "../types";

function Home({ recipes }: { recipes: Recipe[] }) {
  return (
    <>
      <Banner />
      <div className="mt-3"></div>
      <Category />
      <PopularRecipes popularRecipes={recipes} />
    </>
  );
}

export async function getStaticProps() {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const res = await fetch("https://localhost:7193/api/Recipe");
  const recipes = await res.json();

  return {
    props: {
      topbarTransparent: true,
      recipes: recipes,
    },
  };
}

export default Home;
