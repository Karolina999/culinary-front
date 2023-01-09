/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * culinaryApp
 * OpenAPI spec version: 1.0
 */
import type { Level } from './level';
import type { RecipeType } from './recipeType';
import type { ProductFromRecipeCreateDto } from './productFromRecipeCreateDto';
import type { StepDto } from './stepDto';

export interface RecipeProductsStepsDto {
  id?: number;
  title?: string | null;
  level?: Level;
  time?: string | null;
  people?: number;
  photo?: string | null;
  recipeType?: RecipeType;
  ownerId?: number;
  products?: ProductFromRecipeCreateDto[] | null;
  steps?: StepDto[] | null;
}
