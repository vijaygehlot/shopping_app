import React from 'react';
import {View, StyleSheet} from 'react-native';

const HorizontalDivider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
});

export default HorizontalDivider;
