import React from "react";
import Banner from "../components/homePage/banner";
import Category from "../components/homePage/category";
import PopularRecipes from "../components/homePage/popularRecipes";

function Home() {
  return (
    <>
      <Banner />
      <div className="mt-3"></div>
      <Category />
      <PopularRecipes />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      topbarTransparent: true,
    },
  };
}

export default Home;
