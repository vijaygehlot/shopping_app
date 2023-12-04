import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import AddressCard from '../components/AddressCard';
import PaymentCard from '../components/PaymentCard';
import FastImage from 'react-native-fast-image';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const OrderConfirm = ({navigation, route}) => {
  const {cartAmount} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [orderconfirmingState, setOrderconFirmingState] =
    useState<boolean>(false);
  const [orderconfirmedState, setOrderconFirmedState] =
    useState<boolean>(false);

  console.log('cartAmount', cartAmount);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setOrderconFirmingState(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (orderconfirmingState) {
      timeoutId = setTimeout(() => {
        setOrderconFirmingState(false);
        setOrderconFirmedState(true);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [orderconfirmingState]);
  return (
    <View style={styles.container}>
      <View style={[styles.item, {flex: 2}]}>
        <AddressCard />
      </View>
      <View style={[styles.item, {flex: 3}]}>
        <PaymentCard payAmount={cartAmount} />
      </View>
      <View style={[styles.item, {flex: 1}]}>
        <TouchableOpacity onPress={toggleModal} style={styles.button}>
          <Text style={styles.buttonText}>Order Place</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide" // You can choose 'slide', 'fade', or 'none'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {orderconfirmingState && (
              <>
                <FastImage
                  source={{
                    uri: 'https://www.spense.no/hs-fs/hubfs/Animations/Icons/Home/payment-process.gif?width=200&height=200&name=payment-process.gif',
                    priority: FastImage.priority.normal,
                  }}
                  style={styles.gif}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
                    Please Wait...!! Order getting confirm
                  </Text>

                  <Text style={{fontSize: 12, margin: 5}}>
                    Please do not refresh and click back button
                  </Text>
                </View>
              </>
            )}

            {orderconfirmedState && orderconfirmingState === false && (
              <>
                <FastImage
                  source={{
                    uri: 'https://i.pinimg.com/originals/74/2f/7e/742f7ea29cbfd7fd3f4848f17e621070.gif',
                    priority: FastImage.priority.normal,
                  }}
                  style={styles.gif}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
                    Thanks for Order!
                  </Text>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('HomePage')} // Corrected here
                    style={styles.shoppingButton}>
                    <Text style={styles.buttonText}>Shopping Continue</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 50,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#7637ff',
    borderRadius: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    width: '85%',
  },
  shoppingButton: {
    backgroundColor: '#6dafc7',
    borderRadius: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    width: '85%',
    marginTop: '10%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContent: {
    justifyContent: 'center',

    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,

    height: screenHeight * 1,
    width: '100%',
  },
  gif: {
    // Set the width as needed
    height: 250, // Set the height as needed
  },
});

export default OrderConfirm;
