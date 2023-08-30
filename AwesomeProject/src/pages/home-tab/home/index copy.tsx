import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ThemeContext} from '~/theme';
import CommonSafeArea from '~/components/common-safe-area';
import CommonScreen from '~/components/common-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const Testsdd = (props: any) => {
  return (
    <View>
      <LinearGradient colors={['red', '#375BB1']} style={{height: 50}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
          }}>
          <Text style={{color: '#ffffff', fontSize: 28}}>渐变色</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default function HomeScreen() {
  const {theme} = useContext(ThemeContext);
  const title_theme = {color: theme.colors.app_bar_text_color};

  const arr = Array.from({length: 100}, (v, k) => k + 'eee');
  const [datas, setDatas] = useState(arr);

  const myButton = (
    // <FontAwesomeIcon icon="far fa-long-arrow-alt-left" />
    <FontAwesome.Button name="long-arrow-alt-left" backgroundColor="#3b5998">
      Login with Facebook
    </FontAwesome.Button>
  );

  const customTextButton = (
    <FontAwesome.Button name="facebook" backgroundColor="#3b5998">
      <Text style={{fontFamily: 'Arial', fontSize: 15}}>
        Login with Facebook
      </Text>
    </FontAwesome.Button>
  );

  const renderView = () => {
    return (
      <ScrollView style={{borderColor: 'red', borderWidth: 1}}>
        <CommonSafeArea />
        <Testsdd />
        {myButton}
        {customTextButton}
        <Text>common-screen2222</Text>
        {datas.map((item, index) => {
          return (
            <Text key={index} style={[title_theme]}>
              {item}
            </Text>
          );
        })}
      </ScrollView>
    );
  };
  return (
    <CommonScreen appbar={{title: '首页', showBack: false}}>
      {renderView()}
    </CommonScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
