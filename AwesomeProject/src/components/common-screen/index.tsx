import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '~/theme';
import {CommonAppBar, CommonAppBarProps} from '../common-appbar';

interface CommonScreenProps {
  showAppbar?: boolean;
  appbar?: CommonAppBarProps;
  children?: React.ReactNode;
}

export default function CommonScreen({
  showAppbar = true,
  appbar,
  children,
}: CommonScreenProps) {
  const {theme} = useContext(ThemeContext);
  const background_theme = {backgroundColor: theme.colors.page_bg};
  const title_theme = {color: theme.colors.app_bar_text_color};

  return (
    <View style={[styles.container, background_theme]}>
      <StatusBar
        barStyle={theme.colors.barStyle}
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
      />
      {children}
      {showAppbar ? <CommonAppBar {...appbar} /> : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {},
});
