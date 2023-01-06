import React from "react";
import RecipeComponent from "../../components/recipe/recipe";
import Comments from "../../components/comment/comments";
import {
  ProductFromRecipe,
  RatingDto,
  Recipe,
  Step,
  User,
  UserComment,
} from "../../types";
import { feachApi } from "../../utils/feachApi";

interface ShowRecipeProps {
  recipe: Recipe;
  steps: Step[];
  comments: UserComment[];
  rating: RatingDto;
  author: User;
  products: ProductFromRecipe[];
}

const ShowRecipe = ({
  recipe,
  steps,
  comments,
  rating,
  author,
  products,
}: ShowRecipeProps) => {
  return (
    <>
      <RecipeComponent
        recipe={recipe}
        steps={steps}
        rating={rating}
        author={author}
        products={products}
      />
      <Comments comments={comments} recipeId={recipe.id!} />
    </>
  );
};

export default ShowRecipe;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: {
  params: { recipeId: string };
}) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

  // const resRecipe = await fetch(
  //   `https://localhost:7193/api/Recipe/${params.recipeId}`
  // );
  // const recipe = await resRecipe.json();

  const recipe = await feachApi(`/Recipe/${params.recipeId}`);

  if (!recipe || recipe.status) {
    return {
      notFound: true,
    };
  }

  // const resAuthor = await fetch(
  //   `https://localhost:7193/api/Recipe/${params.recipeId}/author`
  // );
  // const author = await resAuthor.json();
  const author = await feachApi(`/Recipe/${params.recipeId}/author`);

  // const resRating = await fetch(
  //   `https://localhost:7193/api/Recipe/${params.recipeId}/rating`
  // );
  // const rating = await resRating.json();
  const rating = await feachApi(`/Recipe/${params.recipeId}/rating`);

  // const resSteps = await fetch(
  //   `https://localhost:7193/api/Recipe/${params.recipeId}/steps`
  // );
  // const steps = await resSteps.json();
  const steps = await feachApi(`/Recipe/${params.recipeId}/steps`);

  // const resComments = await fetch(
  //   `https://localhost:7193/api/Recipe/${params.recipeId}/comments`
  // );
  // const comments = await resComments.json();
  const comments = await feachApi(`/Recipe/${params.recipeId}/comments`);

  // const resProducts = await fetch(
  //   `https://localhost:7193/api/Recipe/${params.recipeId}/products`
  // );
  // const products = await resProducts.json();
  const products = await feachApi(`/Recipe/${params.recipeId}/products`);

  return {
    props: {
      recipe: recipe,
      steps: steps,
      comments: comments,
      rating: rating,
      author: author,
      products: products,
    },
  };
}
