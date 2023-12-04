import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductInfoItem from '../components/ProductInfoItem';

const ProductDetail = ({navigation, route}) => {
  const {productInfo, isCart, favourite} = route.params;

  useEffect(() => {
    console.log('route.params', route.params);
  }, []);

  return (
    <View style={styles.container}>
      <ProductInfoItem
        isCart={isCart}
        isFavourite={favourite}
        data={{...productInfo, id: productInfo.id}}
      />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: '#000',
  },
});
