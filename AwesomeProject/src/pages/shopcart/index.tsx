import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {ThemeContext} from '~/theme';

export default function ShopcartScreen() {
  const {theme} = useContext(ThemeContext);
  return (
    <View style={[styles.container, {backgroundColor: theme.colors.page_bg}]}>
      <Text style={[{color: theme.colors.heading_color}]}>ShopcartScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
