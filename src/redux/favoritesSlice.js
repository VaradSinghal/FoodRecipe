import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Array to store favorite recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const index = state.favoriterecipes.findIndex(
        (favrecipe) => favrecipe.idFood === recipe.idFood
      );
      if (index >= 0) {
        // Recipe exists, remove it
        state.favoriterecipes.splice(index, 1);
      } else {
        // Recipe doesn't exist, add it
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;