import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
export default function AddressManagerScreen() {
  return (
    <View style={styles.container}>
      <Text>AddressManagerScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
