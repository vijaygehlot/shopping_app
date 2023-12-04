import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {truncateBrandName} from '../utils/helper';
import Toast from 'react-native-simple-toast';
import {EVENTS} from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {selectCartData, selectfavouriteData} from '../slices/ProductSlice';

const ProductItem = ({products, navigation, isFavourite}) => {
  const favouriteIds = useSelector(selectfavouriteData);
  const cartIds = useSelector(selectCartData);
  const [cartArray, setCartArray] = useState([]);
  const [favouriteArray, setFavouriteArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialCartArray = products
      ?.filter(product => cartIds.includes(product.id))
      .map(product => product.id);

    const initialFavouriteArray = products
      ?.filter(product => favouriteIds.includes(product.id))
      .map(product => product.id);

    setCartArray(initialCartArray);
    setFavouriteArray(initialFavouriteArray);
  }, [cartIds, favouriteIds, products]);

  const handleAddToCart = id => {
    let updatedCartArray;

    if (cartArray.includes(id)) {
      updatedCartArray = cartArray.filter(productId => productId !== id);
      Toast.show('Product removed from cart', Toast.SHORT);
    } else {
      updatedCartArray = [...cartArray, id];
      console.log('updatedCartArray CHECK_ADD', updatedCartArray);

      Toast.show('Product added to cart', Toast.SHORT);
    }
    dispatch({
      type: EVENTS.SET_CART_PRODUCT,
      payload: {cartData: updatedCartArray},
    });

    setCartArray(updatedCartArray);
  };

  const handleAddToFavourites = id => {
    let updatedFavouriteArray;

    if (favouriteArray.includes(id)) {
      updatedFavouriteArray = favouriteArray.filter(
        productId => productId !== id,
      );
      Toast.show('Product removed from favorites', Toast.SHORT);
    } else {
      updatedFavouriteArray = [...favouriteArray, id];
      console.log('updatedFavouriteArray CHECK_ADD', updatedFavouriteArray);
      Toast.show('Product added to favorites', Toast.SHORT);
    }
    dispatch({
      type: EVENTS.SET_FAVOURITE_PRODUCT,
      payload: {favouriteData: updatedFavouriteArray},
    });
    setFavouriteArray(updatedFavouriteArray);
  };

  const gotProductDetails = data => {
    const isProductInCart = cartArray?.includes(data.id);
    const isProductInFavourites = favouriteArray?.includes(data.id);

    let params = {
      productInfo: data,
      isCart: isProductInCart,
      favourite: isProductInFavourites,
    };

    if (isProductInCart && isProductInFavourites) {
      params = {
        ...params,
        isCart: true,
        favourite: true,
      };
    }

    navigation.navigate('ProductDetail', params);
    //navigation.navigate('ProductDetail', { productInfo: data });
  };

  const renderItem = ({item}) => {
    const id = item.id;
    //onPress={() => gotProductDetails(item)}
    return (
      <View
        style={styles.card}
        onStartShouldSetResponder={() => true}
        onResponderGrant={() => gotProductDetails(item)}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.thumbnail,
          }}
        />

        <Text style={styles.title}>{truncateBrandName(item.brand, 12)}</Text>
        <Text style={styles.priceText}>₹{item.price}/-</Text>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={15}
          startingValue={item.rating}
        />
        <View style={styles.iconContainer}>
          {isFavourite === false ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAddToFavourites(id)}>
              <MaterialCommunityIcons
                name="heart"
                color={favouriteArray?.includes(id) ? 'red' : 'gray'}
                size={20}
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAddToCart(id)}>
            <MaterialCommunityIcons
              name="cart"
              color={cartArray?.includes(id) ? 'blue' : 'gray'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 30,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: '4%',
    marginTop: '4%',
    textAlign: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '4%',
  },
  tinyLogo: {
    width: 110,
    height: 90,
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  actionButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
