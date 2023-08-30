import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '~/theme';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const Style0906 = props => {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.page_bg};
  const card_theme = {backgroundColor: theme.colors.view_bg};
  const {headImg} = props.data;
  return (
    <View style={[commonStyles.container, container_theme]}>
      <View>
        <CommonFastImage source={{uri: headImg}} style={styles.headImg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headImg: {
    width: '100%',
    height: 40,
  },
});

export default Style0906;
