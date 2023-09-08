### https://github.com/react-native-video/react-native-video/blob/master/API.md

### 安装步骤

yarn add react-native-video
yarn add @types/react-native-video --dev 加类型声明文件

### iOS

直接 npx pod-install 即可

### Android

https://www.jianshu.com/p/f2bd9c446116
在 android/settings.gradle 加入

```objc
include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android')

```

在 android/build.gradle 加入

```objc
allprojects {
    repositories {
        ...
        jcenter() {
            content {
                includeModule("com.yqritc", "android-scalablevideoview")
            }
        }
    }
}

```

在 android/app/build.gradle 加入

```objc
dependencies {
    ...
    implementation project(':react-native-video')  //加这个
}

```

在 android/app/src/main/java/com/文件名/MainApplication.java 加入

```objc
import com.brentvatne.react.ReactVideoPackage;  //加这个
...
        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new ReactVideoPackage());   //加这个
          return packages;
        }

```
