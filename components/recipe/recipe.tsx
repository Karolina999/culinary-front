import React from "react";
import Image from "next/image";
import { BsFillAlarmFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillSignal } from "react-icons/ai";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
interface RecipeInterface {
  title: string;
  time: string;
  people: number;
  photo: string;
  level: string;
}
interface RecipeProps {
  recipe: RecipeInterface;
  star: number;
}
const Recipe = ({ recipe, star }: RecipeProps) => {
  const halfStar = !Number.isInteger(star);
  const fillStar = Math.floor(star);
  const regStar = halfStar ? 5 - fillStar - 1 : 5 - fillStar;
  console.log(halfStar);
  return (
    <div style={{ width: "250px" }} className="mx- caladea-font">
      <Image
        src={recipe.photo.length > 0 ? recipe.photo : "/recipe.jpg"}
        alt="Picture of the author"
        width={250}
        height={150}
        style={{ objectFit: "cover" }}
      />
      <h5 className="bold mt-3" style={{ height: "60px" }}>
        {recipe.title.length > 37 ? (
          <>{recipe.title.slice(0, 40)}...</>
        ) : (
          recipe.title
        )}
      </h5>
      {/* <Row className="d-flex">
        <BsClock style={{ fontSize: "18px" }} />
        <p>{recipe.time}</p>
        <BsClock style={{ fontSize: "18px" }} />
        <p>{recipe.time}</p>
        <BsClock style={{ fontSize: "18px" }} />
        <p>{recipe.time}</p>
      </Row> */}
      <div className="d-flex">
        <BsFillAlarmFill style={{ fontSize: "18px" }} />
        <p className="ps-2 pe-2 mb-2">{recipe.time}</p>
        <AiFillSignal style={{ fontSize: "18px" }} />
        <p className="ps-1 pe-2 mb-2">{recipe.level}</p>
        <BsFillPersonFill style={{ fontSize: "20px" }} />
        <p className="ps-1 pe-2 mb-2">{recipe.people}</p>
      </div>
      <div className="d-flex text-warning" style={{ alignItems: "start" }}>
        {[...Array(fillStar)].map((x) => (
          <FaStar style={{ fontSize: "20px" }} />
        ))}
        {halfStar && <FaStarHalfAlt style={{ fontSize: "20px" }} />}
        {[...Array(regStar)].map((x) => (
          <FaRegStar style={{ fontSize: "20px" }} />
        ))}
        <p className="ps-2 text-dark">{star}/5 z 10 recenzji</p>
      </div>
    </div>
  );
};

export default Recipe;
