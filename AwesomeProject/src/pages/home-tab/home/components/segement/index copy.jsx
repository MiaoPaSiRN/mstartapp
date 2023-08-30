import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const dimen = Dimensions.get('window');
const deviceWidth = dimen.width;

const TabBar = React.forwardRef((props, ref) => {
  const [selectIndex, setSelectIndex] = React.useState(-1);
  const [contentSizeW, setContentSizeW] = React.useState(0);
  const [layoutInfoMap, setLayoutInfoMap] = React.useState({}); //所有标签的Layout信息
  const [layoutReady, setLayoutReady] = React.useState(false); //标识是否Layout结束
  const scrollViewRef = React.useRef(null);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  React.useEffect(() => {
    // console.log('TabBar：这里传空数组,只在第一次渲染时调用');
  }, []);
  React.useEffect(() => {
    return () => {
      console.log('TabBar：组件卸载');
    };
  }, []);
  //暴露指定的方法给父组件调用
  React.useImperativeHandle(ref, () => ({
    updateSelectIndex: updateSelectIndex,
  }));

  React.useEffect(() => {
    const keys = Object.keys(layoutInfoMap);
    if (keys.length === props.data?.length && layoutReady === false) {
      setLayoutReady(true);
    }
  }, [layoutInfoMap]);

  React.useEffect(() => {
    if (layoutReady) {
      let contentSizeW_ = 0;
      for (let i = 0; i < props.data.length; i++) {
        const element = props.data[i];
        const lablayout = layoutInfoMap[element.name];
        contentSizeW_ += lablayout.width;
      }
      setContentSizeW(contentSizeW_);
      goToInitialIndex();
    }
  }, [layoutReady]);

  /********************* render **************************/
  function updateSelectIndex(index) {
    goToSelectIndex(index, true);
  }
  /********************* render **************************/
  // 获取标签的Layout信息
  function getLableLayoutInfo(layout, item) {
    const name = item.name;
    const newObj = {...layoutInfoMap};
    newObj[name] = layout;
    setLayoutInfoMap(newObj);
  }

  // 设置默认选中项
  function goToInitialIndex() {
    if (props.initialIndex != null) {
      goToSelectIndex(props.initialIndex, true);
    }
  }

  // 设置选中项
  function goToSelectIndex(index, bl = true) {
    const element = props.data[index];
    setSelectIndex(index);

    const layout = layoutInfoMap[element.name];
    if (layout === undefined) {
      return;
    }

    let rx = deviceWidth / 2;

    var left = 0;
    for (let i = 0; i < props.data.length; i++) {
      const element = props.data[i];
      const lablayout = layoutInfoMap[element.name];
      if (lablayout != undefined) {
        if (i < index) {
          left += lablayout.width;
        }
      }
    }
    left -= rx;
    left += layout.width / 2;

    scrollViewRef.current.scrollToOffset({animated: bl, offset: left});

    props.onChange && props.onChange(index);
  }

  /********************* render **************************/
  return (
    <View style={[tabBarStyle.tab, props.style, {width: contentSizeW}]}>
      <FlatList
        ref={scrollViewRef}
        style={{borderColor: '#FFF', borderWidth: 1}}
        data={props.data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={props.data.length}
        keyExtractor={(item, index) => index}
        onScroll={e => {
          const currentX = e?.nativeEvent?.contentOffset?.x;
          // console.log('TabBar：currentX', currentX);
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => goToSelectIndex(index)}
              onLayout={e => getLableLayoutInfo(e.nativeEvent.layout, item)}
              key={item.id}
              style={tabBarStyle.itemBtn}>
              <Text
                style={[
                  tabBarStyle.item,
                  selectIndex === index ? tabBarStyle.active : null,
                ]}>
                {' '}
                {item.name}
              </Text>
              <View
                style={[
                  tabBarStyle.line,
                  selectIndex === index ? tabBarStyle.active2 : null,
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
});

export default TabBar;

const tabBarStyle = StyleSheet.create({
  tab: {
    backgroundColor: '#fbfafc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  itemBtn: {
    paddingHorizontal: 12,
    paddingTop: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  item: {
    fontSize: 15,
    color: '#858385',
  },
  active: {
    color: '#d0648f',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#fbfafc',
    marginTop: 5,
    marginBottom: 2,
  },
  active2: {
    backgroundColor: '#d0648f',
  },
  sortimg: {
    width: 55,
    height: 40,
  },
});
