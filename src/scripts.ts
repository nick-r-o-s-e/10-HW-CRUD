import axios from "axios";
import { Recipe } from "./types";
import { createCard } from "./create-card";
import { outOfDivClickDetect } from "./click-detect";

const getPosts = () => {
  return axios.get("http://localhost:3004/recipes").then(({ data }) => data);
};

const displayRecipes = async () => {
  await getPosts()
    .then((recipes) => {
      recipes.forEach(async function (recipe: Recipe) {
        await createCard(recipe);
      });
    })
    .then(() => {
      const addBtn = document.createElement("div");
      addBtn.classList.add("add-recipe");

      addBtn.innerHTML = "<i class='fa-solid fa-circle-plus'></i>";
      document.querySelector(".container__recipes").appendChild(addBtn);
      addBtn.addEventListener("click", () => {
        document.querySelector("form").style.display = "block";
        (<HTMLDivElement>(
          document.querySelector(".main-container")
        )).style.pointerEvents = "none";
        outOfDivClickDetect("add-recipe", "add-recipe", "new-recipe-form");
      });
    });
};

displayRecipes();

///////////FORM///////////

///////////INGREDIENTS///////////
const addIngredientBtn = document.querySelector(".add-ingredient");

addIngredientBtn.addEventListener("click", () => {
  const newField = document
    .querySelector(".ingredient-form-input")
    .cloneNode(true) as HTMLDivElement;
  newField.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  newField
    .querySelector(".delete-ingredient")
    .addEventListener("click", (e) => {
      if (document.querySelectorAll(".ingredient-form-input").length > 1) {
        newField.remove();
      }
    });
  document.querySelector(".ingredients-fields").appendChild(newField);
});

const initialIngredientDeleteBtn = document.querySelector(".delete-ingredient");

initialIngredientDeleteBtn.addEventListener("click", (e) => {
  if (document.querySelectorAll(".ingredient-form-input").length > 1) {
    document.querySelectorAll(".ingredient-form-input")[0].remove();
  }
});

///////////DIRECTIONS///////////
const addDirectionBtn = document.querySelector(".add-direction");

addDirectionBtn.addEventListener("click", () => {
  const newField = document
    .querySelector(".direction-form-input")
    .cloneNode(true) as HTMLDivElement;

  const num = document.querySelectorAll(".direction-form-input").length + 1;
  newField.querySelector("label").innerHTML = `Step ${num}`;
  newField.querySelector("textarea").value = "";

  newField.querySelector(".delete-direction").addEventListener("click", (e) => {
    if (document.querySelectorAll(".direction-form-input").length > 1) {
      newField.remove();
      document
        .querySelectorAll(".direction-form-input")
        .forEach((input, index) => {
          input.querySelector("label").innerHTML = `Step ${index + 1}`;
        });
    }
  });

  document.querySelector(".directions-fields").appendChild(newField);
});

const initialDirectionDeleteBtn = document.querySelector(".delete-direction");
initialDirectionDeleteBtn.addEventListener("click", (e) => {
  if (document.querySelectorAll(".direction-form-input").length > 1) {
    document.querySelectorAll(".direction-form-input")[0].remove();
    document
      .querySelectorAll(".direction-form-input")
      .forEach((input, index) => {
        input.querySelector("label").innerHTML = `Step ${index + 1}`;
      });
  }
});

///////////FORM SUBMITTING///////////
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const allInputs = (e.target as HTMLFormElement).querySelectorAll(
    "input, textarea"
  );
  const newRecipe = { directions: [], ingredients: [] } as Recipe;
  allInputs.forEach((input) => {
    const inputClass = input.classList.value.split(" ").at(-1);
    const inputElement = input as HTMLInputElement;
    switch (inputClass) {
      case "form-image-url-input":
        newRecipe.image = inputElement.value;
        break;
      case "form-title":
        newRecipe.title = inputElement.value;
        break;
      case "form-servings":
        newRecipe.servings = inputElement.value;
        break;
      case "form-prep-time":
        newRecipe.prepTime = inputElement.value;
        break;
      case "form-cooc-time":
        newRecipe.coocTime = inputElement.value;
        break;
      case "form-ingredient-quantity":
        if (newRecipe.ingredients) {
          newRecipe.ingredients[newRecipe.ingredients.length] = [
            inputElement.value,
          ];
        } else {
          newRecipe.ingredients = [[inputElement.value]];
        }

        break;
      case "form-ingredient-text":
        if (newRecipe.ingredients) {
          newRecipe.ingredients[newRecipe.ingredients.length - 1].push(
            inputElement.value
          );
        }

        break;
      case "form-direction":
        newRecipe.directions?.push(inputElement.value);

        break;

      default:
        break;
    }
  });

  axios.post("http://localhost:3004/recipes", newRecipe).then(() => {
    location.reload();
  });
});
