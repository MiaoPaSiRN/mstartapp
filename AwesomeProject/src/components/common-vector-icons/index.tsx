import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextStyle,
  GestureResponderEvent,
  ViewStyle,
  ColorValue,
} from 'react-native';
import React, {useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {ThemeContext} from '~/theme';

interface IProps {
  name: string;
  size?: number | undefined;
  backgroundColor?: number | ColorValue | undefined;
  color?: number | ColorValue | undefined;
  iconStyle?: TextStyle | undefined;
  style?: TextStyle | ViewStyle | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
export default function CommonVectorIcon(props: IProps) {
  const {theme} = useContext(ThemeContext);
  // const app_bar_theme = {backgroundColor: theme.colors.app_bar_bg};
  // const title_theme = {color: theme.colors.app_bar_text_color};

  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.onPress ? false : true}>
      <FontAwesome.Button
        disabled={true} //设置可点击，去除原本的长按高亮状态
        name={props.name}
        size={props.size ?? undefined}
        color={props.color ?? theme.colors.btn_tintColor} //控制图标和文字颜色
        backgroundColor={props.backgroundColor ?? 'transparent'}
        iconStyle={Object.assign({}, {marginRight: 0}, props.iconStyle)}
        style={Object.assign(
          {backgroundColor: 'transparent', opacity: 1},
          props.style,
        )} //控制按钮背景色
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
