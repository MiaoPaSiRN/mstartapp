import {Text, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '~/theme';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

// const dimen = Dimensions.get('window');
// const deviceWidth = dimen.width;
// const column = 4;
// const hspace = 5;
// const paddingHorizontal = 10;
const aspectRatio = 203 / 290; //图片宽高比
// const cellW =
//   (deviceWidth - paddingHorizontal * 2 - (column - 1) * hspace) / column;
const Style0912 = props => {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.page_bg};
  const card_theme = {backgroundColor: theme.colors.view_bg};
  const title_theme = {color: theme.colors.app_bar_text_color};
  const {content} = props.data;

  return (
    <View style={[commonStyles.container, container_theme]}>
      <View style={[commonStyles.card, card_theme]}>
        {content.map((item, index) => {
          const {materialId, bgImg} = item;
          return (
            <View
              key={materialId}
              style={[styles.cell, {paddingLeft: index > 0 ? 5 : 0}]}>
              <CommonFastImage source={{uri: bgImg}} style={styles.cell_img} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_img: {
    width: '100%',
    aspectRatio: 203 / 290,
  },
});

export default Style0912;
