/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * culinaryApp
 * OpenAPI spec version: 1.0
 */
import type { MealTypes } from './mealTypes';
import type { RecipeDto } from './recipeDto';

export interface GetPlannerRecipeDto {
  id?: number;
  plannerId?: number;
  recipeId?: number;
  mealType?: MealTypes;
  recipe?: RecipeDto;
}
