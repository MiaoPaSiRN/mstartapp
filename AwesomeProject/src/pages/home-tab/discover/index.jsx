import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, FlatList} from 'react-native';
import {ThemeContext} from '~/theme';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import APDioscoverCell from './APDioscoverCell';
export default class DiscoverScreen extends Component {
  constructor(props) {
    super(props);
    const arr = Array.from({length: 100}, (v, k) => k + 'eee');

    this.state = {
      routeInfo: props.route,
      datas: arr,
    };

    console.log('DiscoverScreen - props', props);
  }

  componentDidMount() {
    setTimeout(() => {}, 1000);
  }

  render() {
    const {routeInfo, datas} = this.state;
    return (
      <CommonScreen appbar={{title: '发现', showBack: false}}>
        <ThemeContext.Consumer>
          {themeContext => {
            console.log('context', themeContext);
            const title_theme = {
              color: themeContext.theme.colors.app_bar_text_color,
            };
            return (
              <View style={[styles.container]}>
                <CommonSafeArea />
                <Text style={[title_theme]}>
                  主题：{themeContext.themeName}
                </Text>
                <Text style={[title_theme]}>{JSON.stringify(routeInfo)}</Text>
                <Button
                  title="切换主题"
                  onPress={() => {
                    if (themeContext.themeName === 'default') {
                      themeContext.changeTheme('dark');
                    } else {
                      themeContext.changeTheme('default');
                    }
                  }}
                />
                <FlatList
                  data={datas}
                  style={[styles.gridView]}
                  initialNumToRender={30}
                  renderItem={({item, index}) => {
                    return <APDioscoverCell key={index} data={item} />;
                  }}
                />
              </View>
            );
          }}
        </ThemeContext.Consumer>
      </CommonScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridView: {
    flex: 1,
  },
});
