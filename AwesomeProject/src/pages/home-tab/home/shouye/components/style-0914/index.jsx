import {Text, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '~/theme';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const Style0914 = props => {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.page_bg};
  const card_theme = {backgroundColor: theme.colors.view_bg};
  const title_theme = {color: theme.colors.app_bar_text_color};
  const {content} = props.data;
  return (
    <View style={[commonStyles.container, container_theme]}>
      <View style={[commonStyles.card, {flexDirection: 'row'}, card_theme]}>
        {content.map((item, index) => {
          const {materialId, title, img} = item;
          return (
            <View key={materialId + title} style={styles.cell}>
              <CommonFastImage source={{uri: img}} style={styles.cell_img} />
              <Text style={{fontSize: 11}}>{title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '20%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_img: {
    width: '70%',
    aspectRatio: 1,
  },
});

export default Style0914;
