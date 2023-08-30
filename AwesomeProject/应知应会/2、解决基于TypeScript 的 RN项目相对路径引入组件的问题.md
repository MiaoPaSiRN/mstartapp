### 1、安装插件

```objc
yarn add babel-plugin-root-import
```

### 2、babel.config.js 增加如下配置

```objc
module.exports = {
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~', // `~` 默认
        rootPathSuffix: 'src',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

```

### 3、执行 npm start -- --reset-cache 命令

已有项目，记得执行此命令清理缓存，这点非常重要，我在调试的过程中，变更过几次符号的配置，如果变更配置后没有执行该命令，则配置不起作用

### 4、设置 typescript 相对路径，在 tsconfig.json 中设置

```objc
     {
     "baseUrl": "./",
      "path": {
        "~/*": ["src /*"],
      }
    }
```

注意:变更设置之后，最好重启下 VSCode

至此，我们在项目中引入文件可以用以下优雅的方式

    import { UserAccount } from '~/constants/const'
    import MyTheme from '~/assets/commonStyle'
