import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "ingredients",
    pathMatch: "full",
  },
  {
    path: "ingredients",
    loadComponent: () => import("./pages/ingredient-input/ingredient-input.component").then(m => m.IngredientInputComponent),
    title: "Ingredient Input"
  },
  {
    path: "generate",
    loadComponent: () => import("./pages/ai-recipe/ai-recipe.component").then(m => m.AIRecipeComponent),
    title: "AI Recipe"
  },
  {
    path: "manage",
    loadComponent: () => import("./pages/recipe-manage/recipe-manage.component").then(m => m.RecipeManageComponent),
    title: "Manage Recipe"
  },
  {
    path: '**',
    redirectTo: 'ingredients'
  }
];
