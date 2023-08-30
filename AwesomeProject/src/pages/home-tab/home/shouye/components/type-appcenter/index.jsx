import {Text, StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import {ThemeContext} from '~/theme';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';
import CommonIndicator from '~/components/common-indicator';

const windowWidth = Dimensions.get('window').width;

const SectionCard = ({data}) => {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.page_bg};
  const card_theme = {backgroundColor: theme.colors.view_bg};
  const title_theme = {color: theme.colors.app_bar_text_color};
  return (
    <View style={[commonStyles.card_wrap, {width: windowWidth}]}>
      {data.map((item, index) => {
        const {id, name, icon} = item;
        return (
          <View key={id + name} style={styles.cell}>
            <CommonFastImage source={{uri: icon}} style={styles.cell_img} />
            <Text style={[styles.cell_title, title_theme]}>{name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default function TypeAppcenter(props) {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.page_bg};
  const card_theme = {backgroundColor: theme.colors.view_bg};
  const title_theme = {color: theme.colors.app_bar_text_color};
  const {content} = props.data;
  const sections = sliceIntoChunks(content.data, 10); //10条数据为一组
  const [currentIndex, setCurrentIndex] = useState(0);

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  return (
    <View
      style={[commonStyles.container, {paddingHorizontal: 0}, container_theme]}>
      <ScrollView
        scrollEventThrottle={16}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={[{backgroundColor: '#FFF'}]}
        onScroll={e => {
          const currentX = e?.nativeEvent?.contentOffset?.x;
          const page =
            Math.floor((currentX - windowWidth / 2) / windowWidth) + 1;
          setCurrentIndex(page);
        }}>
        {sections.map((sectionArr, index) => {
          return <SectionCard key={index} data={sectionArr} />;
        })}
      </ScrollView>
      <CommonIndicator count={sections.length} currentIndex={currentIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '20%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_img: {
    width: '50%',
    aspectRatio: 1,
  },
  cell_title: {
    fontSize: 11,
  },
});
