import axios from "axios";

export const deleteRecipe = (index: number) => {
  axios.delete(`http://localhost:3004/recipes/${index + 1}`).then(() => {
    location.reload();
  });
};
