import axios from "axios";
import { Recipe } from "./types";
import { createCard } from "./create-card";
import { showExpandedCard } from "./expanded-card";

const getPosts = () => {
  return axios.get("http://localhost:3004/recipes").then(({ data }) => data);
};

const addRecipe = (recipe: Recipe) => {
  axios.post("http://localhost:3004/recipes", { ...recipe });
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
    });
};

displayRecipes();

// getPosts();
// updateRecipe(1, "Check");
// addRecipe()
// deleteRecipe(2)
