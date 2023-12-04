import {StyleSheet, Text, View, Button, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';
import {selectAllProducts, selectfavouriteData} from '../slices/ProductSlice';
import {useSelector, useDispatch} from 'react-redux';
import {EVENTS} from '../utils/constant';
import {getCartProducts} from '../utils/helper';
import ProductItem from '../components/ProductItem';
const Favorites = ({navigation}) => {
  const getProducts = useSelector(selectAllProducts);
  const favouriteIds = useSelector(selectfavouriteData);
  const [favouriteArrayList, setFavouriteArrayList] = useState([]);

  useEffect(() => {
    console.log('favouriteIds check-Favourites', favouriteIds);
    console.log('getProducts check-Favourites', getProducts);
    const favouriteList: any = getCartProducts(
      getProducts.products,
      favouriteIds,
    );
    setFavouriteArrayList(favouriteList);
    console.log('favouriteList check-Favourites', favouriteList);
  }, [getProducts, favouriteIds]);

  if (favouriteArrayList.length > 0) {
    return (
      <View style={styles.container}>
        <ProductItem
          navigation={navigation}
          isFavourite={true}
          products={favouriteArrayList}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.favLogo}
        source={{
          uri: 'https://png.pngtree.com/png-vector/20220401/ourmid/pngtree-basket-retail-emblem-empty-vector-png-image_35837868.png',
        }}
      />
      <Text style={styles.favMsg}>Not Favourite Products yet!</Text>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  favLogo: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  favMsg: {fontSize: 20, color: 'blue'},
});
