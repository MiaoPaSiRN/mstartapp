import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text, RefreshControl} from 'react-native';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import CommonFooter, {FooterState} from '~/components/common-footer';
import {commonService} from '~/api/common-service';
import CommonFastImage from '~/components/common-fast-image';
import CommonVectorIcon from '~/components/common-vector-icons';

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
                const data: any = item;
                const photo = data.photo ?? {};
                const author = data.author ?? {};
                return (
                  <View style={[styles.videoView, {height: videoViewH}]}>
                    <CommonFastImage
                      style={styles.background}
                      defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
                      source={{uri: photo.animatedCoverUrl}}
                    />

                    <View style={styles.bottomBarWrap}>
                      <View style={styles.addressWrap}>
                        <Text style={styles.addressText}>附近-碧桂园-龙城</Text>
                      </View>
                      <View style={styles.userInfoWrap}>
                        <Text style={styles.userName}>{photo.caption}</Text>
                      </View>
                      <CommonSafeArea type="bottom" />
                    </View>
                    <View style={styles.rightBarWrap}>
                      <CommonFastImage
                        style={styles.userAval}
                        defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
                        source={{uri: author.headerUrl}}
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
  videoView: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
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
