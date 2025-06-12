import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
  import React, { useEffect } from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { useNavigation } from '@react-navigation/native';
  
  export default function Recipe({ categories, foods }) {
    const navigation = useNavigation();
  
    useEffect(() => {
      console.log('Foods received:', foods);
    }, [foods]);
  
    const renderItem = ({ item, index }) => (
      <ArticleCard item={item} index={index} navigation={navigation} />
    );
  
    return (
      <View style={styles.container}>
        <View testID="recipesDisplay">
          <FlatList
            data={foods}
            keyExtractor={(item) => item.recipeId}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
  
  const ArticleCard = ({ item, index, navigation }) => {
    return (
      <View
        style={[styles.cardContainer, { paddingLeft: 20, paddingRight: 15 }]}
        testID="articleDisplay"
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
        >
          <Image
            source={{
              uri:
                item.recipeImage ||
                'https://via.placeholder.com/150', // Fallback image
            }}
            style={styles.articleImage}
            onError={(error) =>
              console.log('Image load error:', error.nativeEvent.error)
            }
          />
          <Text style={styles.articleText}>{item.recipeName}</Text>
          <Text style={styles.articleDescription}>{item.cookingDescription}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: wp(4),
      marginTop: hp(2),
    },
    row: {
      justifyContent: 'space-between',
    },
    cardContainer: {
      marginBottom: hp(2),
      flex: 1,
    },
    articleImage: {
      width: '100%',
      height: hp(20),
      borderRadius: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    articleText: {
      fontSize: hp(1.8),
      fontWeight: '600',
      color: '#52525B',
      marginTop: hp(1),
    },
    articleDescription: {
      fontSize: hp(1.4),
      color: '#6B7280',
      marginTop: hp(0.5),
    },
  });