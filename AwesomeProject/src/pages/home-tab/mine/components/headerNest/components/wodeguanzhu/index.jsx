import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import CommonFastImage from '~/components/common-fast-image';

export default class WodeguanzhuFloor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{borderColor: 'red', borderWidth: 1, height: 50}}>
        <Text>wodeguanzhu</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
