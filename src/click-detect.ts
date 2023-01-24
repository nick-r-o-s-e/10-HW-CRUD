export const outOfDivClickDetect = (
  toggler: string,
  id: string,
  element: string
) => {
  window.addEventListener("click", function handler(e) {
    const firstClassName = (e.target as HTMLElement).classList.value.split(
      " "
    )[0];
    if (
      (e.target as HTMLElement).classList.value.split(" ").at(-1) != toggler &&
      firstClassName != "delete-ingredient" &&
      firstClassName != "delete-direction" &&
      firstClassName != "delete-ingredient-editing-button" &&
      firstClassName != "delete-direction-editing-button" &&
      firstClassName != "add-direction"
    ) {
      if (!document.getElementById(id)?.contains(e.target as HTMLDivElement)) {
        console.log();

        if (element == "new-recipe-form") {
          const form = document.querySelector(`.${element}`) as HTMLFormElement;
          form.style.display = "none";
        } else {
          document.querySelector(`.${element}`)?.remove();
        }

        window.removeEventListener("click", handler);
        (<HTMLDivElement>(
          document.querySelector(".main-container")
        )).style.pointerEvents = "auto";
      }
    }
  });
};
