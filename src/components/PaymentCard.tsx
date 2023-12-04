import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import HorizontalDivider from './HorizontalDivider';

const PaymentCard = ({payAmount}) => {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handlePress = value => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTotalValue}>
        <Text style={styles.subTotalText}>Expected Delivery : </Text>05th
        December 2023
      </Text>

      <Text style={styles.subTotalText}>All Payment Options</Text>

      <View style={styles.radioButton}>
        <RadioButton
          value="option2"
          status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
          onPress={() => handlePress('option2')}
          disabled
        />
        <Text style={styles.text}>UPI Payment</Text>
      </View>

      <View style={styles.radioButton}>
        <RadioButton
          value="option3"
          status={selectedValue === 'option3' ? 'checked' : 'unchecked'}
          onPress={() => handlePress('option3')}
          disabled
        />
        <Text style={styles.text}>Wallets</Text>
      </View>

      <View style={styles.radioButton}>
        <RadioButton
          value="option4"
          status={selectedValue === 'option4' ? 'checked' : 'unchecked'}
          onPress={() => handlePress('option4')}
          disabled
        />
        <Text style={styles.text}>Credit / Debit / ATM Card</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="option1"
          status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
          onPress={() => handlePress('option1')}
        />
        <Text style={styles.text}>POD (Pay on Delivery)</Text>
      </View>
      <Text style={styles.subTotalValue}>
        <Text style={styles.subTotalText}>Amount Payable: </Text>₹ {payAmount}
      </Text>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 30,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    marginLeft: 8,
  },

  subTotalText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '900',
    marginBottom: 5,
    marginTop: 8,
  },

  subTotalValue: {
    fontSize: 15,
    color: 'gray',
    fontWeight: '600',
  },
});
