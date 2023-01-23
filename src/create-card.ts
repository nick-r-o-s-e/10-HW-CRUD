import { Recipe } from "./types";
import axios from "axios";
import { showExpandedCard } from "./expanded-card";

export const createCard = (recipe: Recipe) => {
  //CARD ELEMENT
  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "small-card");

  const readMoreBtn = document.createElement("i");
  readMoreBtn.classList.add("read-more-btn", "fa-solid", "fa-book-open");
  card.appendChild(readMoreBtn);

  const index = document.querySelectorAll(".card").length;
  readMoreBtn.addEventListener("click", () => {
    showExpandedCard(recipe, index);
  });

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "g-0");
  card.appendChild(rowDiv);

  //CARD IMAGE
  const imgCol = document.createElement("div");
  imgCol.classList.add("col-md-12", "col-lg-6", "img-col");

  const image = <HTMLImageElement>document.createElement("img");
  image.classList.add("img-fluid", "rounded-start");
  image.src = recipe.image;

  imgCol.appendChild(image);
  rowDiv.appendChild(imgCol);

  //CARD CONTENT
  const contentCol = document.createElement("div");
  contentCol.classList.add("col-md-12", "col-lg-6");
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

  for (let i = 1; i < 5; i++) {
    let title: string;
    let text: string | number;

    switch (i) {
      case 1:
        title = "Ingredients";
        text = recipe.ingredients.length;
        break;
      case 2:
        title = "Servings:";
        text = recipe.servings;
        break;
      case 3:
        title = "Prep time:";
        text = recipe.prepTime;
        break;
      case 4:
        title = "Cooc time:";
        text = recipe.coocTime;
        break;

      default:
        break;
    }

    const detailCol = document.createElement("div");
    details.appendChild(detailCol);

    const detailHeading = document.createElement("h4");
    detailHeading.classList.add("card-subtitle");
    detailHeading.appendChild(document.createTextNode(title));
    detailCol.appendChild(detailHeading);

    const detailText = document.createElement("p");
    detailText.classList.add("card-text");
    detailText.appendChild(document.createTextNode(String(text)));
    detailCol.appendChild(detailText);
  }

  document.querySelector(".container__recipes")?.appendChild(card);
};
