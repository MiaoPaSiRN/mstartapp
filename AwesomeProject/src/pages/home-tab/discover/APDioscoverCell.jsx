import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from '~/theme';

export default class APDioscoverCell extends Component {
  render() {
    const {data} = this.props;
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          console.log('context', themeContext);
          const title_theme = {
            color: themeContext.theme.colors.app_bar_text_color,
          };
          return (
            <TouchableOpacity style={[styles.container]} onPress={() => {}}>
              <Text style={[styles.itemName, title_theme]}>{data}</Text>
            </TouchableOpacity>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 44,
    borderColor: 'red',
    borderWidth: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
});
