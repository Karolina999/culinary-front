/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * culinaryApp
 * OpenAPI spec version: 1.0
 */
import type { Unit } from './unit';
import type { MealTypes } from './mealTypes';
import type { Ingredient } from './ingredient';
import type { Planner } from './planner';

export interface ProductFromPlanner {
  id?: number;
  unit?: Unit;
  amount?: number;
  mealType?: MealTypes;
  ingredientId?: number;
  ingredient?: Ingredient;
  planner?: Planner;
}
