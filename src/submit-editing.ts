import { Recipe } from "./types";
import axios from "axios";

export const submitEditing = (card: HTMLDivElement, index: number) => {
  document.querySelector(".card-expanded").querySelectorAll("i").forEach(icon=>{icon.style.display="none"})
  const updatedRecipe = {} as Recipe;
  updatedRecipe.title = (<HTMLInputElement>(
    card.querySelector(".title-input")
  )).value;
  updatedRecipe.servings = (<HTMLInputElement>(
    card.querySelectorAll(".detail-input")[0]
  )).value;
  updatedRecipe.prepTime = (<HTMLInputElement>(
    card.querySelectorAll(".detail-input")[1]
  )).value;
  updatedRecipe.coocTime = (<HTMLInputElement>(
    card.querySelectorAll(".detail-input")[2]
  )).value;
  for (let i = 0; i < card.querySelectorAll(".ingredient-input").length; i++) {
    if (!updatedRecipe.ingredients) {
      updatedRecipe.ingredients = [];
    }
    updatedRecipe.ingredients.push([
      (<HTMLInputElement>card.querySelectorAll(".quantity-input")[i])?.value,
      (<HTMLInputElement>card.querySelectorAll(".ingredient-input")[i]).value,
    ]);
  }
  for (let i = 0; i < card.querySelectorAll(".direction-input").length; i++) {
    if (!updatedRecipe.directions) {
      updatedRecipe.directions = [];
    }
    updatedRecipe.directions.push(
      (<HTMLInputElement>card.querySelectorAll(".direction-input")[i]).value
    );
  }
  axios
    .patch(`http://localhost:3004/recipes/${index + 1}`, updatedRecipe)
    .then(() => {
      location.reload();
    });
};
