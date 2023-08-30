import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import PagerView from 'react-native-pager-view';
import NavigationBar from './components/navigationBar';
import TanguanScreen from './tanguan';
import ShouyeScreen from './shouye';
import DaPaiScreen from './dapai';
import ShanghaiScreen from './shanghai';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabDatas: [],
      initialIndex: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    setTimeout(() => {
      const initialIndex = 1;
      const tabDatas = [
        {id: 'tanguan', name: '探馆'},
        {id: 'shouye', name: '首页'},
        {id: 'dapai', name: '大牌'},
        {id: 'shanghai', name: '上海'},
      ];
      this.setState({loading: false});
      this.setState({tabDatas, initialIndex});
    }, 100);
  }

  render() {
    const {tabDatas, initialIndex, loading} = this.state;
    if (loading) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }

    if (tabDatas.length === 0) {
      return (
        <View>
          <Text>空</Text>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <PagerView
          ref={ref => (this.pagerRef = ref)}
          style={{flex: 1}}
          scrollEnabled={false}
          initialPage={initialIndex}>
          {tabDatas.map((item, index) => {
            const {id, name} = item;
            if (id === 'tanguan') {
              return <TanguanScreen key={item.id} tabDatas={item} />;
            } else if (id === 'shouye') {
              return <ShouyeScreen key={item.id} tabDatas={item} />;
            } else if (id === 'dapai') {
              return <DaPaiScreen key={item.id} tabDatas={item} />;
            } else if (id === 'shanghai') {
              return <ShanghaiScreen key={item.id} tabDatas={item} />;
            }
            return <View key={item.id} tabDatas={item} />;
          })}
        </PagerView>
        <NavigationBar
          ref={element => (this.navBar = element)}
          data={{...this.state}}
          onChange={index => {
            this.pagerRef.setPage(index);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
