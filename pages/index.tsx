import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Banner from "../components/homePage/banner";
import Category from "../components/homePage/category";
import PopularRecipes from "../components/homePage/popularRecipes";
import Topbar from "../components/topbar";

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
