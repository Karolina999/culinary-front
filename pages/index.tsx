import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Banner from "../components/homePage/banner";
import Category from "../components/homePage/category";
import PopularRecipes from "../components/homePage/popularRecipes";
import Topbar from "../components/topbar";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = (event: any) => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Topbar transparent={scrollY < 90} />
      <Banner />
      <div className="mt-3"></div>
      <Category />
      <PopularRecipes />
      <Footer />
    </>
  );
}
