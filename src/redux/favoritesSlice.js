import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],  // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const idFood = action.payload.idFood;
      const existingIndex = state.favoriterecipes.findIndex(
        (recipe) => recipe.idFood === idFood
      );

      if (existingIndex >= 0) {
        // Si la recette existe déjà, on la retire
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Sinon, on ajoute la recette au tableau des favoris
        state.favoriterecipes.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;