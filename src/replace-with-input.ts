export const replaceWithInput = (
    element: Element,
    inputClass: string,
    height?: number
  ) => {
    let input: HTMLElement;
    if (inputClass == "direction-input") {
      input = document.createElement("textarea");
      input.style.height = String(height + 40) + "px";
      input.innerHTML = element?.innerHTML;
    } else {
      input = document.createElement("input");
      input.setAttribute("value", element?.innerHTML);
    }

    input.classList.add(inputClass);

    if (element?.classList.value.split("only-text").length > 1) {
      input.style.width = "100%";
    } 
    input.style.fontSize = element && window.getComputedStyle(element).fontSize;
    element?.replaceWith(input);
  };
