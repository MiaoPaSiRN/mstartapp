import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, FlatList} from 'react-native';
import {ThemeContext} from '~/theme';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import APShopcartCell from './APShopcartCell';
import Father from './father';
export default class ShopcartScreen extends Component {
  constructor(props) {
    super(props);
    const arr = Array.from({length: 100}, (v, k) => k + 'eee');

    this.state = {
      routeInfo: props.route,
      datas: arr,
    };

    console.log('ShopcartScreen - props', props);
  }

  componentDidMount() {
    setTimeout(() => {}, 1000);
  }

  render() {
    const {routeInfo, datas} = this.state;
    return (
      <CommonScreen appbar={{title: '购物车', showBack: false}}>
        <View style={[styles.container]}>
          <CommonSafeArea></CommonSafeArea>
          <Father></Father>
          <FlatList
            data={datas}
            style={[styles.gridView]}
            initialNumToRender={30}
            renderItem={({item, index}) => {
              return <APShopcartCell key={index} data={item} />;
            }}
          />
        </View>
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
