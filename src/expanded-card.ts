import { Recipe } from "./types";
import { turnOnEditMode } from "./editing-mode";
import { deleteRecipe } from "./delete-recipe";


export const showExpandedCard = (recipe: Recipe, index: number) => {
  const otherSmallCards = document.querySelectorAll(".small-card");
  otherSmallCards.forEach((card: HTMLDivElement, i) => {
    if (i != index) {
      card.style.pointerEvents = "none";
    }
  });
  //CARD ELEMENT
  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "card-expanded");

  const editBtn = document.createElement("i");
  editBtn.classList.add("edit-btn", "fa-solid", "fa-pen-to-square");
  card.appendChild(editBtn);

  editBtn.addEventListener("click", () => {
    turnOnEditMode(index);
    // console.log(index);
    
  });

  

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "g-0");
  card.appendChild(rowDiv);

  //CARD IMAGE
  const imgCol = document.createElement("div");
  imgCol.classList.add("col-md-3", "img-col");

  const image = <HTMLImageElement>document.createElement("img");
  image.classList.add("img-fluid", "rounded-start");
  image.src = recipe.image;

  imgCol.appendChild(image);
  rowDiv.appendChild(imgCol);

  //CARD CONTENT
  const contentCol = document.createElement("div");
  contentCol.classList.add("col-lg-9");
  rowDiv.appendChild(contentCol);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  contentCol.appendChild(cardBody);

  //CONTENT HEADING
  const title = document.createElement("h2");
  title.classList.add("card-title");
  title.appendChild(document.createTextNode(recipe.title));
  cardBody.appendChild(title);

 
  //DETAILS
  const details = document.createElement("div");
  details.classList.add("details");
  cardBody.appendChild(details);

  for (let i = 1; i < 4; i++) {
    let title: string;
    let text: string | number;

    switch (i) {
      case 1:
        title = "Servings:";
        text = recipe.servings;
        break;
      case 2:
        title = "Prep time:";
        text = recipe.prepTime;
        break;
      case 3:
        title = "Cooc time:";
        text = recipe.coocTime;
        break;

      default:
        break;
    }

    const detailCol = document.createElement("div");
    details.appendChild(detailCol);
    detailCol.classList.add("detail");

    const detailHeading = document.createElement("h4");
    detailHeading.classList.add("detail-title");
    detailHeading.appendChild(document.createTextNode(title));
    detailCol.appendChild(detailHeading);

    const detailText = document.createElement("h6");
    detailText.classList.add("detail-text");
    detailText.appendChild(document.createTextNode(String(text)));
    detailCol.appendChild(detailText);
  }

  //MAIN CONTENT
  const mainContent = document.createElement("div");
  mainContent.classList.add("main-content");
  cardBody.appendChild(mainContent);

  //INGREDIENTS
  const ingredients = document.createElement("div");
  ingredients.classList.add("ingredients");
  mainContent.appendChild(ingredients);

  const ingredientsHeading = document.createElement("h3");
  ingredientsHeading.appendChild(document.createTextNode("Ingredients"));
  ingredients.appendChild(ingredientsHeading);

  for (let i = 0; i < recipe.ingredients.length; i++) {
    const qty = recipe.ingredients[i][0];
    const val = recipe.ingredients[i][1];

    const item = document.createElement("div");
    item.classList.add("ingredient");
    ingredients.appendChild(item);

    if (val) {
      const quantity = document.createElement("h5");
      quantity.appendChild(document.createTextNode(qty));
      quantity.classList.add("quantity");
      item.appendChild(quantity);

      const ingredient = document.createElement("p");
      ingredient.appendChild(document.createTextNode(val));
      item.appendChild(ingredient);
    } else {
      const ingredient = document.createElement("p");
      ingredient.appendChild(document.createTextNode(recipe.ingredients[i][0]));
      ingredient.classList.add("only-text");
      item.appendChild(ingredient);
    }
  }

  //DIRECTIONS
  const directions = document.createElement("div");
  directions.classList.add("directions");
  mainContent.appendChild(directions);

  const directionsHeading = document.createElement("h3");
  directionsHeading.appendChild(document.createTextNode("Directions"));
  directions.appendChild(directionsHeading);

  for (let i = 0; i < recipe.directions.length; i++) {
    const step = i + 1;
    const text = recipe.directions[i];

    const item = document.createElement("div");
    item.classList.add("direction");
    directions.appendChild(item);

    const stepNum = document.createElement("h5");
    stepNum.appendChild(document.createTextNode(`Step ${String(step)}`));
    item.appendChild(stepNum);

    const description = document.createElement("p");
    description.appendChild(document.createTextNode(text));
    item.appendChild(description);
  }

  document.querySelector("body").appendChild(card);
};
