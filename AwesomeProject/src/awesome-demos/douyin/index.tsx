import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  Alert,
  ViewToken,
  DeviceEventEmitter,
} from 'react-native';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import CommonFooter, {FooterState} from '~/components/common-footer';
import {commonService} from '~/api/common-service';
import DouYinVideoCell from './cell';
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class DouYinScreen extends Component {
  state = {
    loadingFirst: false,
    loadingNext: false,
    loadFlag: false,
    viewState: ViewState.default,
    footerState: FooterState.default,
    data: [],
    page: 1,
    pageSize: 15,
    isPause: true, //控制播放器是否播放，下面的代码有解释一个列表只需要一个state控制，而不用数组
    current: 0, //表示当前item的索引，通过这个实现一个state控制全部的播放器
  };

  constructor(props: any) {
    super(props);
    console.log('DouYinScreen - props', props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchData(1);
    }, 600);
  }

  /********************* 网络请求 **************************/
  fetchData = (page: number) => {
    if (page === 1) {
      if (this.state.data.length > 0) {
        this.state.loadingFirst = true;
      }
    } else {
      this.state.loadingNext = true;
    }
    if (page === 1 && this.state.data.length === 0) {
      this.state.viewState = ViewState.loading;
    }
    this.setState({});
    commonService
      .fetchKuaiShowVideoList(page)
      .then((response: any) => {
        const list = response.data.brilliantTypeData.feeds;
        const hasNext = list.length === 0 ? false : true;
        this.state.loadingFirst = false;
        this.state.loadingNext = false;
        if (page === 1 && list.length === 0) {
          this.state.viewState = ViewState.empty;
        } else {
          let newData;
          if (page === 1) {
            newData = list;
          } else {
            newData = [...this.state.data, ...list];
          }
          this.state.page = page;
          this.state.data = newData;
          this.state.footerState = hasNext
            ? FooterState.loading
            : FooterState.noMore;
          this.state.viewState = ViewState.success;
        }
      })
      .catch((error: any) => {
        console.log('catch - error', error);
        this.state.loadingFirst = false;
        this.state.loadingNext = false;
        if (page === 1) {
          this.state.viewState = ViewState.error;
        } else {
          this.state.footerState = FooterState.error;
        }
      })
      .finally(() => {
        this.setState({});
      });
  };

  _onEndReached = () => {
    if (!this.state.loadFlag) {
      return;
    }
    if (this.state.loadingFirst || this.state.loadingNext) {
      return;
    }
    if (this.state.footerState === FooterState.noMore) {
      return;
    }
    this.state.loadFlag = false;
    this.setState({});
    this.fetchData(this.state.page + 1);
  };

  // 1. Define a function outside the component:
  _onViewableItemsChanged = (info: {viewableItems: ViewToken[]}) => {
    console.log(info);
    //这个方法为了让state对应当前呈现在页面上的item的播放器的state
    //也就是只会有一个播放器播放，而不会每个item都播放
    //可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
    //只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
    if (info.viewableItems.length === 1) {
      this.state.current = info.viewableItems[0].index ?? 0;
      this.setState({});
      DeviceEventEmitter.emit('video_current_index', this.state.current); //发送消息，并携带param参数
    }
  };
  _renderListView = () => {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => {
          const videoViewH =
            DEVICE_HEIGHT - (Math.max(insets?.top ?? 0, 22) + 44);

          return (
            <FlatList
              style={{flex: 1}}
              data={this.state.data}
              pagingEnabled={true}
              ListFooterComponent={
                <CommonFooter footerState={this.state.footerState} />
              }
              onEndReached={this._onEndReached}
              onEndReachedThreshold={0.01}
              onScrollBeginDrag={() => {
                this.state.loadFlag = true;
              }}
              onScrollEndDrag={() => console.log('Scroll end')}
              viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 80, //item滑动80%部分才会到下一个
              }}
              onViewableItemsChanged={this._onViewableItemsChanged}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loadingFirst}
                  onRefresh={() => {
                    if (
                      this.state.loadingFirst === true ||
                      this.state.loadingNext === true
                    ) {
                      return;
                    }
                    this.fetchData(1);
                  }}
                />
              }
              keyExtractor={(item, index) => `${index}`}
              renderItem={({item, index}) => {
                return (
                  <DouYinVideoCell
                    info={item}
                    videoViewH={videoViewH}
                    index={index}
                    current={this.state.current}
                  />
                );
              }}
            />
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  };

  render() {
    return (
      <CommonScreen appbar={{title: '抖音'}}>
        <CommonSafeArea />
        <CommonStateView
          viewState={this.state.viewState}
          onPress={state => {
            if (state === ViewState.error) {
              this.fetchData(1);
            }
          }}>
          {this._renderListView()}
        </CommonStateView>
      </CommonScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
