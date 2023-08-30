import {Text, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '~/theme';
import {commonStyles} from '../common';
import CommonFastImage from '~/components/common-fast-image';

export default function TypeFloat() {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.page_bg};
  const card_theme = {backgroundColor: theme.colors.view_bg};
  const title_theme = {color: theme.colors.app_bar_text_color};
  return (
    <View>
      <Text>float</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
