https://github.com/oblador/react-native-vector-icons

### iOS 配置

1、将 node_modules/react-native-vector-icons 中的 Fonts 文件夹直接复制到 Xcode 项目中
2、编辑 Info.plist

```objc
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>FontAwesome6_Brands.ttf</string>
  <string>FontAwesome6_Regular.ttf</string>
  <string>FontAwesome6_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
  <string>Fontisto.ttf</string>
</array>
```

### Android 配置
