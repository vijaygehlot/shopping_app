import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AddressCard = () => {
  return (
    <View style={styles.containerCard}>
      <View style={[styles.item, {flex: 4, alignItems: 'flex-start'}]}>
        <Text style={styles.deliveryTitle}>Home Delivery</Text>
        <Text style={styles.nameText}>John Smith</Text>
        <Text style={styles.allText}>456 Park Avenue</Text>
        <Text style={styles.allText}>New York,JNY</Text>
        <Text style={styles.allText}> 10022,USA</Text>
        <Text style={styles.allText}>Phone: (415) 555‑0132</Text>
      </View>
      <View style={[styles.item, {flex: 2, alignItems: 'flex-end'}]}>
        <Text style={styles.changeAddText}>Change Address</Text>
      </View>
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Optional: Add padding to the container
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    height: 50, 
    marginHorizontal: 5, 
  },
  deliveryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  changeAddText: {
    color: '#47999e',
    fontSize: 14,
    fontWeight: '600',
  },
  allText: {
    fontSize: 15,
    color: 'gray',
    fontWeight: '500',
    marginTop: 5,
  },
  nameText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
  },
});
