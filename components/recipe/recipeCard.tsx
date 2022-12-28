import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsFillAlarmFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillSignal } from "react-icons/ai";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { RatingDto, Recipe } from "../../types";
import Link from "next/link";
import router from "next/router";
import { Level } from "../../utils/level";

interface RecipeProps {
  recipe: Recipe;
}
const RecipeCard = ({ recipe }: RecipeProps) => {
  const [halfStar, setHalfStar] = useState(false);
  const [fillStar, setFillStar] = useState(0);
  const [regStar, setRegStar] = useState(5);
  const [rating, setRating] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);

  useEffect(() => {
    async function fetchRating() {
      const res = await fetch(
        `https://localhost:7193/api/Recipe/${recipe.id}/rating`
      );
      const json: RatingDto = await res.json();
      const r = json.rating;
      const fill = r && Math.floor(r);
      const half = !Number.isInteger(r);
      r && setRating(r);
      setHalfStar(half);
      fill && setFillStar(fill);
      fill && setRegStar(half ? 5 - fill - 1 : 5 - fill);
      json.numberOfReviews && setNumberOfReviews(json.numberOfReviews);
    }
    fetchRating();
  }, []);

  return (
    <div
      onClick={() =>
        router.push(`/przepisy/${recipe.id}`, "", { scroll: true })
      }
      className="cursor-pointer"
    >
      <div style={{ width: "250px" }} className="mx-auto caladea-font shadow ">
        <Image
          src={
            recipe.photo && recipe.photo.length > 0
              ? recipe.photo
              : "/recipe.jpg"
          }
          alt="Picture of the author"
          width={250}
          height={150}
          style={{ objectFit: "cover" }}
        />
        <h5 className="bold mt-3 px-2" style={{ height: "60px" }}>
          {recipe.title && recipe.title.length > 37 ? (
            <>{recipe.title.slice(0, 40)}...</>
          ) : (
            recipe.title
          )}
        </h5>
        <div className="d-flex px-2">
          <BsFillAlarmFill style={{ fontSize: "18px" }} />
          <p className="ps-2 pe-2 mb-2">{recipe.time}</p>
          <AiFillSignal style={{ fontSize: "18px" }} />
          <p className="ps-1 pe-2 mb-2">
            {Level[recipe.level ? recipe.level : 0]}
          </p>
          <BsFillPersonFill style={{ fontSize: "20px" }} />
          <p className="ps-1 pe-2 mb-2">{recipe.people}</p>
        </div>
        <div
          className="d-flex text-warning px-2"
          style={{ alignItems: "start" }}
        >
          {[...Array(fillStar)].map((x, index) => (
            <FaStar style={{ fontSize: "18px" }} key={index} />
          ))}
          {halfStar && <FaStarHalfAlt style={{ fontSize: "18px" }} />}
          {[...Array(regStar)].map((x, index) => (
            <FaRegStar style={{ fontSize: "18px" }} key={index} />
          ))}
          <p className="ps-2 text-dark" style={{ fontSize: "14px" }}>
            {rating.toFixed(1)}/5 z {numberOfReviews} recenzji
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
