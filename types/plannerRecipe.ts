/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * culinaryApp
 * OpenAPI spec version: 1.0
 */
import type { Planner } from './planner';
import type { Recipe } from './recipe';
import type { MealTypes } from './mealTypes';

export interface PlannerRecipe {
  id?: number;
  plannerId?: number;
  planner?: Planner;
  recipeId?: number;
  recipe?: Recipe;
  mealType?: MealTypes;
}
