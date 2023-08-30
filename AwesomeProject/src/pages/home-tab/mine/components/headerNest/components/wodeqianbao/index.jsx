import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {ThemeContext} from '~/theme';

export default class WodeqianbaoFloor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          const card_theme = {
            backgroundColor: themeContext.theme.colors.view_bg,
          };

          return (
            <View style={styles.container}>
              <View style={[styles.card, card_theme]}>
                <BottomListView {...this.props} />
              </View>
              <View style={{height: 5}}></View>
            </View>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
  },
});

///// --- 底部订单BottomListView
class BottomListView extends Component {
  handlePress = item => {
    const {name, icon, value} = item;
    if (name === '待付款') {
    } else if (name === '待收货') {
    } else if (name === '待评价') {
    } else if (name === '退换/售后') {
    } else if (name === '我的订单') {
    }
  };

  _renderNumContent = functionId => {
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          const title_theme = {
            color: themeContext.theme.colors.app_bar_text_color,
          };
          const {encStr} = this.props.floor.data;
          let numContent;
          if (functionId === 'jindou') {
            numContent = (
              <View>
                <Text style={[bottomStyles.numContentStyle, title_theme]}>
                  {encStr?.jindou?.numContent}
                </Text>
              </View>
            );
          } else if (functionId === 'youhuiquan') {
            numContent = (
              <View>
                <Text style={[bottomStyles.numContentStyle, title_theme]}>
                  {encStr?.youhuiquan?.numContent}
                </Text>
              </View>
            );
          } else if (functionId === 'wodebaitiao') {
            numContent = (
              <View style={bottomStyles.numContent}>
                <Text style={[bottomStyles.numContentStyle, title_theme]}>
                  {encStr?.wodebaitiao?.numContent}
                </Text>
                <Text style={{fontSize: 11, color: '#666'}}>元</Text>
              </View>
            );
          } else if (functionId === 'wodejintiao') {
            numContent = (
              <View style={bottomStyles.numContent}>
                <Text style={[bottomStyles.numContentStyle, title_theme]}>
                  {encStr?.wodejintiao?.numContent}
                </Text>
                <Text style={{fontSize: 11, color: title_theme.color}}>万</Text>
              </View>
            );
          } else if (functionId === 'qianbaochaxun') {
            numContent = (
              <View style={{width: 25, height: 25, backgroundColor: '#EEE'}} />
            );
          }
          return numContent;
        }}
      </ThemeContext.Consumer>
    );
  };

  render() {
    const {walletList} = this.props.floor.data;
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          const title_theme = {
            color: themeContext.theme.colors.app_bar_text_color,
          };
          const subtitle_theme = {
            color: themeContext.theme.colors.app_bar_text_color,
          };
          return (
            <View style={bottomStyles.container}>
              {walletList.map((item, index) => {
                const {functionId, title, subtitle} = item;

                return (
                  <TouchableOpacity
                    key={functionId}
                    style={bottomStyles.item}
                    onPress={() => this.handlePress(item)}>
                    {this._renderNumContent(functionId)}
                    <Text style={[bottomStyles.title, title_theme]}>
                      {title.value}
                    </Text>
                    <Text style={[bottomStyles.subtitle, subtitle_theme]}>
                      {subtitle.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

const bottomStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  numContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  numContentStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 13,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
  },
});
