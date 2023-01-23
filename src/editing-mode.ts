import { deleteRecipe } from "./delete-recipe";
import { replaceWithInput } from "./replace-with-input";
import { submitEditing } from "./submit-editing";


export const turnOnEditMode = (index: number) => {
    const card = <HTMLDivElement>document.querySelector(".card-expanded");
  
    const btn = document.querySelector(".edit-btn");
    btn.classList.value = "edit-btn fa-solid fa-square-check";
    btn.addEventListener("click", () => {submitEditing(card, index)});
  
    const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("delete-btn", "fa-solid", "fa-trash-can");
  card.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    deleteRecipe(index);
  });

    // const deleteBtn = <HTMLElement>document.querySelector(".delete-btn")
    // deleteBtn.style.display = "none"
    
    replaceWithInput(card.querySelector(".card-title"), "title-input");
  
    card.querySelectorAll(".detail-text").forEach((detail) => {
      replaceWithInput(detail, "detail-input");
    });
  
    card.querySelectorAll(".ingredient").forEach((ingredient) => {
      ingredient.classList.add("editing-ingredient");
      replaceWithInput(ingredient.querySelector("p"), "ingredient-input");
    });
    card.querySelectorAll(".ingredient").forEach((direction) => {
      
      replaceWithInput(direction.querySelector(".quantity"), "quantity-input");
    });
  
    card.querySelectorAll(".direction").forEach((direction) => {
      const height = direction.querySelector("p")?.offsetHeight;
  
      replaceWithInput(direction.querySelector("p"), "direction-input", height);
    });

    
  };