import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import React, {Component} from 'react';
import CommonFastImage from '~/components/common-fast-image';

export default class PlatCardFloor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ContentView {...this.props} />
        </View>
        <View style={{height: 5}}></View>
      </View>
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

///// --- 底部订单ContentView
class ContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const flatListWidth = windowWidth - 20;

    const {floors} = this.props.floor.data;
    const space = 10;
    const itemW = (flatListWidth - space) / 2;

    return (
      <View style={ctvStyles.container}>
        {floors.map((item, index) => {
          const {refId} = item;
          const {headInfo, contentInfo} = item.data;
          const card1Sty = {
            width: itemW,
            marginRight: index % 2 === 0 ? space : 0,
          };
          return (
            <View key={refId} style={[ctvStyles.card, card1Sty]}>
              <View style={ctvStyles.cardHeader}>
                <CommonFastImage
                  source={{uri: headInfo.logo}}
                  style={{width: 20, height: 20}}
                />
                <Text>{headInfo?.title?.value}</Text>
                <CommonFastImage
                  source={{uri: headInfo.arrow}}
                  style={{width: 10, height: 10}}
                />
              </View>
              <CommonFastImage
                source={{uri: contentInfo.contentImg}}
                style={{
                  width: '100%',
                  height: 80,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

const ctvStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
