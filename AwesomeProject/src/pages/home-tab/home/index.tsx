import React, {useState, useContext, useRef} from 'react';
import {StyleSheet, View, Text, useWindowDimensions} from 'react-native';
import {TabView} from 'react-native-tab-view';
import NavigationBar from './components/navigationBar';
import TanguanScreen from './tanguan';
import ShouyeScreen from './shouye';
import DaPaiScreen from './dapai';
import ShanghaiScreen from './shanghai';
import CustomTabBar from './HomeContentView';
import CommonCustomTabBarDemo from '~/awesome-demos/custom-tabbar-demo';
import HomeContentView from './HomeContentView';

const defaultRoutes = [
  {key: 'tanguan', title: '探馆'},
  {key: 'shouye', title: '首页'},
  {key: 'dapai', title: '大牌'},
  {key: 'shanghai', title: '上海'},
];
export default function HomeScreen() {
  const [routes, setRoutes] = useState(defaultRoutes);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const navBarRef = useRef<any>();
  const layout = useWindowDimensions();
  const _renderScene = (props: any) => {
    const {index, route} = props;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          borderColor: 'red',
          borderWidth: 1,
        }}
        key={route.key}>
        <Text>{route.key}11111</Text>
      </View>
    );
    // if (route.key === 'tanguan') {
    //   return <TanguanScreen key={route.key} tabDatas={route} />;
    // } else if (route.key === 'shouye') {
    //   return <ShouyeScreen key={route.key} tabDatas={route} />;
    // } else if (route.key === 'dapai') {
    //   return <DaPaiScreen key={route.key} tabDatas={route} />;
    // } else if (route.key === 'shanghai') {
    //   return <ShanghaiScreen key={route.key} tabDatas={route} />;
    // }

    // return <View key={route.key} />;
  };

  return <HomeContentView />;

  // return (
  //   <View style={styles.container}>
  //     <TabView
  //       // swipeEnabled={false}
  //       // animationEnabled={false}
  //       navigationState={{index: index, routes: routes}}
  //       renderTabBar={() => <View />}
  //       renderScene={_renderScene}
  //       onIndexChange={index => setIndex(index)}
  //       lazy={true}
  //       initialLayout={{width: layout.width}}
  //     />
  //     <NavigationBar
  //       ref={navBarRef}
  //       tabDatas={routes}
  //       initialIndex={index}
  //       onChange={(index: number) => {
  //         console.log('object', index);
  //         setIndex(index);
  //       }}
  //     />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
