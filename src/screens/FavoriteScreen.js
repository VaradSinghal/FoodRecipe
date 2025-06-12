import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Fetch favorite recipes from Redux store
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];
  // console.log('favoriteRecipes', favoriteRecipes.favoriterecipes);
  // console.log('favoriteRecipesList', favoriteRecipesList);

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      <Image
        source={{ uri: item.recipeImage }}
        style={styles.recipeImage}
        onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
      />
      <Text style={styles.recipeTitle}>
        {item.recipeName.length > 20 ? `${item.recipeName.slice(0, 20)}...` : item.recipeName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View testID="FavoriteRecipes">
        <Text style={styles.headerText}>
          My Favorite Recipes
        </Text>
      </View>

      {/* Go Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Go back</Text>
      </TouchableOpacity>

      {/* Favorite Recipes List */}
      <FlatList
        data={favoriteRecipesList}
        keyExtractor={(item) => item.idFood}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  headerText: {
    fontSize: hp(3.8),
    fontWeight: "600",
    color: "#4B5563", // text-neutral-600
    marginTop: hp(4),
    marginLeft: wp(5),
  },
  backButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: hp(2),
    width: 100,
    alignItems: "center",
    marginLeft: wp(5),
  },
  backButtonText: {
    color: "#fff",
    fontSize: hp(1.8),
    fontWeight: "600",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
    flex: 1,
  },
});
