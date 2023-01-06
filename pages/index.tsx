import React from "react";
import Banner from "../components/homePage/banner";
import Category from "../components/homePage/category";
import PopularRecipes from "../components/homePage/popularRecipes";
import { Recipe } from "../types";
import { feachApi } from "../utils/feachApi";

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
  const recipes = await feachApi("/Recipe/top12");

  return {
    props: {
      topbarTransparent: true,
      recipes: recipes,
    },
  };
}

export default Home;
