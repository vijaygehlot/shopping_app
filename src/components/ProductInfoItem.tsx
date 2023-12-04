import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {EVENTS} from '../utils/constant';

const ProductInfoItem = ({data, isCart, isFavourite}) => {
  const {id, title, description, price, brand, images} = data;
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [cartArray, setCartArray] = useState([isCart === true ? id : 0]);
  const [favouriteArray, setFavouriteArray] = useState([
    isFavourite === true ? id : 0,
  ]);
  const dispatch = useDispatch();
  const handleAddToCart = id => {
    let updatedCartArray;

    if (cartArray.includes(id)) {
      updatedCartArray = cartArray.filter(productId => productId !== id);
      Toast.show('Product removed from cart', Toast.SHORT);
    } else {
      updatedCartArray = [...cartArray, id];

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

      Toast.show('Product added to favorites', Toast.SHORT);
    }
    dispatch({
      type: EVENTS.SET_FAVOURITE_PRODUCT,
      payload: {favouriteData: updatedFavouriteArray},
    });
    setFavouriteArray(updatedFavouriteArray);
  };

  const renderCarouselItem = ({item}) => (
    <Image source={{uri: item}} style={styles.carouselImage} />
  );

  return (
    <View style={styles.container}>
      <View style={[styles.row, {flex: 2.8}]}>
        <Carousel
          data={images}
          renderItem={renderCarouselItem}
          sliderWidth={300}
          itemWidth={300}
          onSnapToItem={index => setActiveSlide(index)}
          autoplay
          loop
          autoplayDelay={2000} // Set the delay as needed
          autoplayInterval={5000} // Set the interval as needed
        />

        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      <View
        style={[
          styles.row,
          {
            flex: 1.8,
            backgroundColor: '#F0F0F0',
            alignItems: 'flex-start',
            padding: '2%',
          },
        ]}>
        <Text style={styles.title}>{brand}</Text>

        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <View style={[styles.row, {flex: 1.4}]}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddToFavourites(id)}>
            <Text style={styles.buttonText}>
              {' '}
              <Text>
                <MaterialCommunityIcons
                  name="heart"
                  color={favouriteArray.includes(id) ? 'red' : 'gray'}
                  size={20}
                />
              </Text>{' '}
              Favourite
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddToCart(id)}>
            <Text style={styles.buttonText}>
              {' '}
              <Text>
                <MaterialCommunityIcons
                  name="cart"
                  color={cartArray.includes(id) ? 'blue' : 'gray'}
                  size={20}
                />
              </Text>{' '}
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  carouselImage: {
    width: 300,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  paginationContainer: {
    marginTop: -30,
  },
  dotStyle: {
    width: 12,
    height: 12,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  detailsContainer: {
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: '5%',
  },
  brand: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: '5%',
  },
  description: {
    fontSize: 16,
    marginBottom: 5,

    marginLeft: '5%',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
    marginLeft: '5%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: 150, // Adjust the width as needed
    height: 60, // Adjust the height as needed
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
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 50,
  },
});

export default ProductInfoItem;
