import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Topbar from "./topbar";

interface LayoutProps {
  children: JSX.Element;
  topbarTransparent?: boolean;
}

const Layout = ({ children, topbarTransparent }: LayoutProps) => {
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
      <Topbar transparent={topbarTransparent ? scrollY < 90 : false} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
