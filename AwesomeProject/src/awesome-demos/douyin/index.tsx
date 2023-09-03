import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const data = [1, 2, 3, 4];
export default class DouYinScreen extends Component {
  constructor(props: any) {
    super(props);
    console.log('AddressManagerScreen - props', props);
  }

  componentDidMount() {
    setTimeout(() => {}, 1000);
  }

  render() {
    return (
      <CommonScreen appbar={{title: '抖音'}}>
        <CommonSafeArea />
        <SafeAreaInsetsContext.Consumer>
          {insets => {
            const videoViewH =
              DEVICE_HEIGHT - (Math.max(insets?.top ?? 0, 22) + 44);
            return (
              <FlatList
                data={data}
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item, index}) => {
                  return (
                    <View style={[styles.videoView, {height: videoViewH}]}>
                      <Text>{index}</Text>
                    </View>
                  );
                }}
              />
            );
          }}
        </SafeAreaInsetsContext.Consumer>
      </CommonScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
});
