import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, Button, Platform} from 'react-native';
import {ThemeContext} from '~/theme';
import MiaopasiRnMapView, {Region} from 'miaopasi-rn-cardview';
import CommonAMap from './amap';

export default function NewsScreen() {
  const {theme} = useContext(ThemeContext);

  return <CommonAMap />;
  return <MiaopasiRnMapViewWrap />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  box: {
    flex: 1,
    // width: '100%',
    // height: 200,
    marginBottom: 20,
  },
});

const isIOS = Platform.OS === 'ios';
function MiaopasiRnMapViewWrap() {
  var mapRef: MiaopasiRnMapView | null;

  const initialRegion = {
    latitude: 31.18573,
    longitude: 121.60698,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  var region = {
    latitude: 37.48,
    longitude: -122.16,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  const onRegionChangeComplete = (region: Region) => {
    // Do stuff with event.region.latitude, etc.
    console.log('onRegionChangeComplete: ', region);
  };

  if (isIOS) {
    return (
      <View style={styles.container}>
        <MiaopasiRnMapView
          ref={ref => (mapRef = ref)}
          style={styles.box}
          initialRegion={initialRegion}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}>
          <Text>地图1</Text>
        </MiaopasiRnMapView>
        <MiaopasiRnMapView
          style={styles.box}
          initialRegion={initialRegion}
          region={region}
          onRegionChange={onRegionChangeComplete}>
          <Text>地图2</Text>
        </MiaopasiRnMapView>
        <Button
          title="点击修改地图1的region参数"
          onPress={() => {
            mapRef?.animateToRegion(
              {
                latitude: 37.48,
                longitude: -122.16,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              },
              10,
            );
          }}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>while</Text>
      </View>
    );
  }
}
