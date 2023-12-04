import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {EVENTS} from '../utils/constant';
import {
  selectAllProducts,
  selectCartData,
  setCartData,
} from '../slices/ProductSlice';
import {getCartProducts} from '../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = ({navigation}) => {
  const getProducts = useSelector(selectAllProducts);
  const cartIds = useSelector(selectCartData);

  const [cart, setCart] = useState([]);
  const deliveryCharge = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('cartData check-CART', cartIds);
    console.log('getProducts check-CART', getProducts);
    const cartList: any = getCartProducts(getProducts.products, cartIds);
    setCart(cartList);
  }, [getProducts, cartIds]);

  const addToCart = productId => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      if (existingItem.quantity < existingItem.stock) {
        if (cart !== undefined) {
          setCart(
            cart.map(item =>
              item.id === productId
                ? {...item, quantity: item.quantity + 1}
                : item,
            ),
          );
        }
      }
    } else {
      const productToAdd = product?.find(item => item.id === productId);
      if (productToAdd) {
        setCart([...cart, {...productToAdd, quantity: 1}]);
      }
    }
  };

  const removeFromCart = productId => {
    setCart(cart?.filter(item => item.id !== productId));

    dispatch(setCartData(cartIds.filter(id => id !== productId)));
  };

  const decreaseQuantity = productId => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? {...item, quantity: Math.max(1, item.quantity - 1)}
          : item,
      ),
    );
  };

  const calculateTotal = () => {
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    total += deliveryCharge;
    return total;
  };

  const renderItem = ({item}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', margin: 1}}>
      <View style={styles.container}>
        <View style={[styles.column, {flex: 2}]}>
          <Image
            source={{uri: item.thumbnail}}
            style={{width: 80, height: 80, marginRight: 10}}
          />
        </View>
        <View style={[styles.column, {flex: 3}]}>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.priceText}>₹{item.price}/- </Text>
          <Text style={styles.stockText}>Stock: {item.stock}</Text>
        </View>
        <View
          style={[styles.column, {flex: 1, justifyContent: 'space-between'}]}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => addToCart(item.id)}>
            <MaterialCommunityIcons name="plus" color="black" size={20} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          {item.quantity > 1 ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => decreaseQuantity(item.id)}>
              <MaterialCommunityIcons name="minus" color="black" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => removeFromCart(item.id)}>
              <MaterialCommunityIcons name="delete" color="red" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  if (cart?.length > 0) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{color: 'black', padding: '5%', fontSize: 20}}>
          My Cart
        </Text>
        <View style={{flex: 5}}>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View
          style={{
            flex: 1,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 2,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}>
          <View style={{alignItems: 'center', margin: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={styles.subTotalValue}>
                <Text style={styles.subTotalText}>SubTotal:</Text> ₹
                {calculateTotal() - deliveryCharge}
              </Text>
              <Text style={styles.subTotalValue}>
                <Text style={styles.subTotalText}>Shipping Charge:</Text> ₹
                {deliveryCharge}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.subTotalValue}>
                <Text style={styles.subTotalText}>Amount Payable:</Text>₹
                {calculateTotal()}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OrderConfirm', {
                    cartAmount: calculateTotal(),
                  })
                }
                style={{
                  backgroundColor: '#007BFF',
                  borderRadius: 20,
                  padding: 10, // Adjust padding to increase the button size
                  width: 120, // Adjust width as needed
                  alignItems: 'center',
                  height: 40,
                  marginLeft: '5%',
                }}>
                <Text style={styles.checkoutText}>Check out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.containerMain}>
      <Image
        style={styles.cartLogo}
        source={{
          uri: 'https://www.pngitem.com/pimgs/m/480-4803503_your-cart-is-currently-empty-empty-cart-icon.png',
        }}
      />
      <Text style={styles.cartMsg}> Your Cart is empty!</Text>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Optional: Add padding to the container
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  column: {
    flex: 1,
    marginHorizontal: 2,
  },
  textStyle: {
    fontSize: 18,
    color: '#000',
  },

  actionText: {
    fontSize: 18,
    fontWeight: '900',
  },
  actionButton: {
    width: 25,
    height: 25,
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
  quantityText: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: '10%',
  },
  brandText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '5%',
    marginTop: '5%',
  },
  stockText: {
    color: 'green',
    fontWeight: '400',
    fontSize: 12,
  },

  subTotalText: {
    fontSize: 15,
    color: 'gray',
    fontWeight: '500',
  },

  subTotalValue: {
    fontSize: 18,
    color: 'black',
    fontWeight: '900',
    marginLeft: '5%',
    marginTop: '2%',
  },

  finalTotalText: {
    margin: '4%',
    fontSize: 20,
    color: 'black',
    fontWeight: '900',
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  containerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartLogo: {
    height: 100,
    width: 100,
    marginBottom: 5,
  },
  cartMsg: {fontSize: 20, color: 'blue'},
});
