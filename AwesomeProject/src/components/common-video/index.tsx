import React from 'react';
import {
  ViewStyle,
  StyleProp,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import RNVideo, {VideoProperties} from 'react-native-video';

interface componentProps extends VideoProperties {
  style?: StyleProp<ViewStyle>;
}

interface State {
  videoPaused?: boolean;
  hideControl?: boolean;
  duration: number; //总时长-秒
  currentTime: number; //当前进度-秒
  isLoading?: boolean; //加载中
}

const date = {
  prefixZero: (num: any, n: any) => {
    return (Array(n).join('0') + num).slice(-n);
  },
  parseSeconds: (second: number) => {
    if (second > 0) {
      let hour = 0;
      let minute = 0;
      let seconds = 0;
      let data: {
        hour?: number;
        minute?: number;
        seconds?: number;
      } = {};
      minute = Math.floor(second / 60);
      if (parseInt(String(minute), 10) > 60) {
        hour = parseInt(String(minute / 60), 10);
        minute %= 60; //算出有多分钟
      }
      seconds = second % 60;
      data.hour = hour;
      data.minute = minute;
      data.seconds = parseInt(String(seconds), 10);

      return data;
    }
  },
} as const;

export default class Video extends React.PureComponent<componentProps, State> {
  static defaultProps = {
    resizeMode: 'contain',
    controls: false,
    repeat: true,
    paused: false,
    // poster: '',
    // posterResizeMode: ''
  };

  public state: State = {
    currentTime: 0,
    duration: 0,
  };

  render() {
    const {videoPaused, hideControl, currentTime, duration, isLoading} =
      this.state;
    const {style, ...restProps} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          position: 'relative',
        }}
        onPress={this.toggleHideControl}>
        <RNVideo
          style={[
            {
              backgroundColor: 'rgba(0,0,0,0.8)',
            },
            style,
          ]}
          {...restProps}
          ref={this.handleBindRef}
          paused={videoPaused}
          onLoadStart={this.onVideoLoadStart}
          onLoad={this.onLoad}
          onEnd={this.onEnd}
          progressUpdateInterval={1000}
          onProgress={this.onProgress}
        />
        {hideControl ? null : (
          <View style={styles.controlBox}>
            <View style={[styles.controlBtns, {flex: 1}]}>
              <TouchableOpacity
                style={styles.playBtn}
                onPress={this.togglePause}>
                {videoPaused ? <Text>{'播放'}</Text> : <Text>{'暂停'}</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.towardBtn}
                onPress={this.headBack}>
                <Text>{'<<'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.towardBtn}
                onPress={this.headForward}>
                <Text>{'>>'}</Text>
              </TouchableOpacity>
            </View>
            {!isLoading && duration ? (
              <View style={{paddingHorizontal: 10}}>
                <Text style={{}}>
                  {this.parseSeconds(currentTime)}/{this.parseSeconds(duration)}
                </Text>
              </View>
            ) : null}
          </View>
        )}
        {isLoading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }

  private refVideo: any = null;
  private handleBindRef = (e: any) => {
    this.refVideo = e;
  };

  private parseSeconds = (second: number) => {
    const vals = date.parseSeconds(second);
    if (vals) {
      let hour = vals.hour ? date.prefixZero(vals.hour, 2) : '';
      let minute = date.prefixZero(vals.minute, 2);
      let seconds = date.prefixZero(vals.seconds, 2);
      return hour
        ? hour + ':' + minute + ':' + seconds
        : minute + ':' + seconds;
    } else {
      return '';
    }
  };

  private togglePause = () => {
    const {videoPaused} = this.state;
    if (videoPaused) {
      this.autoHideControls();
    }
    this.setState({videoPaused: !videoPaused});
  };
  private toggleHideControl = () => {
    const {hideControl} = this.state;
    if (hideControl) {
      this.autoHideControls();
    }
    this.setState({hideControl: !hideControl});
  };
  private autoHideTimeout: any = null;
  private autoHideControls = () => {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }
    this.autoHideTimeout = setTimeout(() => {
      if (!this.state.videoPaused) {
        this.setState({hideControl: true});
      }
    }, 5000);
  };

  onVideoLoadStart = () => {
    this.setState({isLoading: true});
  };
  private onLoad = (data: any) => {
    this.setState({duration: data.duration, isLoading: false});
    this.autoHideControls();
  };
  private onEnd = () => {
    // TODO:  //BUG: repeat=false的情况下，onEnd后重新播放，不执行onProgress;
    this.setState({
      videoPaused: true,
      currentTime: 0,
      duration: 0,
    });
  };
  private onProgress = (data: any) => {
    this.setState({currentTime: data.currentTime});
  };

  private seekTo = (second: number) => {
    this.refVideo?.seek(second);
  };
  private stepNumber: number = 5; //一次前进后退的秒数
  private headForward = () => {
    const {currentTime, duration} = this.state;
    let target = currentTime + this.stepNumber;
    target = target > duration ? duration : target;
    this.seekTo(target);
    this.autoHideControls();
  };
  private headBack = () => {
    const {currentTime, duration} = this.state;
    let target = currentTime - this.stepNumber;
    target = target > 0 ? target : 0;
    this.seekTo(target);
    this.autoHideControls();
  };
}

const styles = StyleSheet.create({
  controlBox: {},
  controlBtns: {},
  playBtn: {},
  towardBtn: {},
  loadingBox: {},
});
