import { deleteRecipe } from "./delete-recipe";
import { replaceWithInput } from "./replace-with-input";
import { submitEditing } from "./submit-editing";

export const turnOnEditMode = (index: number, id: number) => {
  const card = <HTMLDivElement>document.querySelector(".card-expanded");

  const submitBtn = document.querySelector(".edit-btn");
  submitBtn.classList.value = "edit-btn fa-solid fa-square-check";
  submitBtn.addEventListener("click", () => {
    submitEditing(card, index);
  });

  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("delete-btn", "fa-solid", "fa-trash-can");
  card.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    deleteRecipe(id);
  });

  ///////TITLE///////
  replaceWithInput(card.querySelector(".card-title"), "title-input");

  ///////DETAILS///////
  card.querySelectorAll(".detail-text").forEach((detail) => {
    replaceWithInput(detail, "detail-input");
  });

  ///////INGREDIENTS///////
  card.querySelectorAll(".ingredient").forEach((ingredient) => {
    ingredient.classList.add("editing-ingredient");

    replaceWithInput(ingredient.querySelector("p"), "ingredient-input");
  });
  card.querySelectorAll(".ingredient").forEach((direction) => {
    replaceWithInput(direction.querySelector(".quantity"), "quantity-input");
  });

  const addIngredientDeleteHandler = (btn: HTMLElement) => {
    btn.addEventListener("click", (e) => {
      if (card.querySelectorAll(".editing-ingredient").length > 1) {
        (e.target as HTMLElement).parentElement.remove();
      }
    });
  };

  card.querySelectorAll(".editing-ingredient").forEach((field) => {
    const deleteEditingBtn = document.createElement("i");

    deleteEditingBtn.classList.add(
      "delete-ingredient-editing-button",
      "fa-solid",
      "fa-trash-can"
    );

    addIngredientDeleteHandler(deleteEditingBtn);

    field.appendChild(deleteEditingBtn);
  });

  const addIngredientBtn = document.createElement("i");
  addIngredientBtn.classList.add(
    "add-ingredient",
    "fa-solid",
    "fa-circle-plus"
  );
  card.querySelector(".ingredients").appendChild(addIngredientBtn);

  addIngredientBtn.addEventListener("click", (e) => {
    const newIput = card
      .querySelector(".editing-ingredient")
      .cloneNode(true) as HTMLDivElement;
    newIput.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    addIngredientDeleteHandler(
      newIput.querySelector(".delete-ingredient-editing-button")
    );

    (e.target as HTMLElement).remove();

    document.querySelector(".ingredients").appendChild(newIput);
    card.querySelector(".ingredients").appendChild(addIngredientBtn);
  });

  ///////DIRECTIONS///////
  card.querySelectorAll(".direction").forEach((direction) => {
    direction.classList.add("editing-direction");
    const height = direction.querySelector("p")?.offsetHeight;

    replaceWithInput(direction.querySelector("p"), "direction-input", height);
  });

  const addDirectionDeleteHandler = (btn: HTMLElement) => {
    btn.addEventListener("click", (e) => {
      if (card.querySelectorAll(".editing-direction").length > 1) {
        (e.target as HTMLElement).parentElement.remove();

        for (
          let i = 0;
          i < card.querySelectorAll(".editing-direction").length;
          i++
        ) {
          card.querySelectorAll(".step-title")[i].innerHTML = `Step ${i + 1}`;
        }
      }
    });
  };

  card.querySelectorAll(".editing-direction").forEach((field) => {
    const deleteEditingBtn = document.createElement("i");

    deleteEditingBtn.classList.add(
      "delete-direction-editing-button",
      "fa-solid",
      "fa-trash-can"
    );
    addDirectionDeleteHandler(deleteEditingBtn);

    field.appendChild(deleteEditingBtn);
  });

  const addDirectionBtn = document.createElement("i");
  addDirectionBtn.classList.add("add-direction", "fa-solid", "fa-circle-plus");
  card.querySelector(".directions").appendChild(addDirectionBtn);

  addDirectionBtn.addEventListener("click", (e) => {
    const newTextarea = card
      .querySelector(".editing-direction")
      .cloneNode(true) as HTMLDivElement;
    newTextarea.querySelector(".step-title").innerHTML = `Step ${
      card.querySelectorAll(".editing-direction").length + 1
    }`;
    newTextarea.querySelector("textarea").value = "";
    addDirectionDeleteHandler(
      newTextarea.querySelector(".delete-direction-editing-button")
    );

    (e.target as HTMLElement).remove();

    document.querySelector(".directions").appendChild(newTextarea);
    card.querySelector(".directions").appendChild(addDirectionBtn);
  });
};
