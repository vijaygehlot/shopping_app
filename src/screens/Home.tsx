import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {selectAllProducts} from '../slices/ProductSlice';
import {useSelector, useDispatch} from 'react-redux';
import {EVENTS} from '../utils/constant';
import ProductItem from '../components/ProductItem';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Home = ({navigation}) => {
  const getAllProducts = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dispatch({type: EVENTS.GET_PRODUCTS, payload: {}});
  }, [dispatch]);

  useEffect(() => {
    console.log('getAllProducts', getAllProducts);

    if (getAllProducts !== undefined) {
      setProductList(getAllProducts?.products);
    }
  }, [getAllProducts]);

  if (getAllProducts?.products?.length > 0) {
    return (
      <View style={styles.container}>
        <ProductItem
          navigation={navigation}
          isFavourite={false}
          products={productList}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={'large'}
        animating={true}
        color={MD2Colors.blue400}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'red',
  },
});
