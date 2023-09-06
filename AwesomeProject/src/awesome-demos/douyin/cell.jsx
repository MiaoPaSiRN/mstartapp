import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  DeviceEventEmitter,
  Dimensions,
} from 'react-native';
import CommonFastImage from '~/components/common-fast-image';
import CommonVectorIcon from '~/components/common-vector-icons';
import CommonSafeArea from '~/components/common-safe-area';
import Video from 'react-native-video';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class DouYinVideoCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: props.info,
      videoViewH: props.videoViewH,
      index: props.index,
      paused: true,
    };
  }
  componentDidMount() {
    console.log(`DouYinVideoCell ${this.state.index}:componentDidMount`);
    if (this.props.current === this.state.index) {
      if (this.player?.setNativeProps) {
        this.player.setNativeProps({paused: false});
      }
    }

    //页面加载完毕，开启监听消息
    this.listener = DeviceEventEmitter.addListener(
      'video_current_index',
      message => {
        // 收到监听后想做的事情 // 监听
        if (message === this.state.index) {
          if (this.player?.setNativeProps) {
            this.player.setNativeProps({paused: false});
          }
          console.log(`DouYinVideoCell ${this.state.index}:收到消息: 开始播放`);
        } else {
          if (this.player?.setNativeProps) {
            this.player.setNativeProps({paused: true});
          }
          console.log(`DouYinVideoCell ${this.state.index}:收到消息: 停止播放`);
        }
      },
    );
  }

  componentWillUnmount() {
    console.log('DouYinVideoCell componentWillUnmount');
    //当页面销毁时，移除事件的监听
    this.listener.remove();
    //停止视频播放
    if (this.player?.setNativeProps) {
      this.player.setNativeProps({paused: true});
    }
  }
  render() {
    return (
      <>
        <View style={[styles.videoView, {height: this.state.videoViewH}]}>
          <CommonFastImage
            style={styles.background}
            defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
            source={{uri: this.state.info.photo?.animatedCoverUrl ?? ''}}
          />
          <Video
            source={{
              uri: 'https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/kuaishou/videos/video_1.mp4',
            }}
            style={{flex: 1, backgroundColor: '#000'}}
            repeat={true}
            paused={this.state.paused}
            resizeMode="contain"
            ref={ref => {
              this.player = ref;
            }}
          />

          <View style={styles.bottomBarWrap}>
            <View style={styles.addressWrap}>
              <Text style={styles.addressText}>附近-碧桂园-龙城</Text>
            </View>
            <View style={styles.userInfoWrap}>
              <Text style={styles.userName}>
                {this.state.info.photo?.caption ?? ''}
              </Text>
            </View>
            <CommonSafeArea type="bottom" />
          </View>
          <View style={styles.rightBarWrap}>
            <CommonFastImage
              style={styles.userAval}
              defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
              source={{uri: this.state.info.author?.headerUrl ?? ''}}
            />
            <FlatList
              data={['heart', 'comments', 'star', 'share']}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.actionBtn}>
                    <CommonVectorIcon name={item} color={'#FFF'} />
                    <Text style={styles.actionTitle}>{index}</Text>
                  </View>
                );
              }}
            />
            <View style={{height: 100}} />
            <CommonSafeArea type="bottom" />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  videoView: {
    flex: 1,
  },
  background: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  bottomBarWrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  addressWrap: {
    padding: 10,
  },
  addressText: {
    color: '#FFF',
  },
  userInfoWrap: {
    width: '100%',
    padding: 10,
  },
  userName: {
    color: '#FFF',
  },
  rightBarWrap: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  userAval: {
    width: 50,
    height: 50,
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 10,
  },
  actionBtn: {
    marginBottom: 10,
    alignItems: 'center',
  },
  actionTitle: {
    color: '#FFF',
  },
});

export default DouYinVideoCell;
