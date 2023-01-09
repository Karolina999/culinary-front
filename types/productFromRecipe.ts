/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * culinaryApp
 * OpenAPI spec version: 1.0
 */
import type { Unit } from './unit';
import type { Ingredient } from './ingredient';
import type { Recipe } from './recipe';

export interface ProductFromRecipe {
  id?: number;
  unit?: Unit;
  amount?: number;
  ingredientId?: number;
  ingredient?: Ingredient;
  recipe?: Recipe;
}
