import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '~/theme';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const Style0911 = props => {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.page_bg};
  const card_theme = {backgroundColor: theme.colors.view_bg};
  const {content} = props.data;
  return (
    <View style={[commonStyles.container, container_theme]}>
      <View style={[commonStyles.card, {flexDirection: 'row'}, card_theme]}>
        {content.map((item, index) => {
          const {materialId, bgImg} = item;
          return (
            <View
              key={materialId}
              style={[styles.cell, {paddingLeft: index === 0 ? 0 : 10}]}>
              <CommonFastImage
                source={{uri: bgImg}}
                style={{
                  borderRadius: 10,
                  width: '100%',
                  aspectRatio: 510 / 195,
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    paddingLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Style0911;
