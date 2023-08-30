### 一键上传 android/ios APP 到各个测试平台和 app store

https://www.npmjs.com/package/react-native-upload/v/1.1.0-rc.0
https://github.com/fwh1990/react-native-upload

### 1、安装插件

```objc
# Npm
npm install react-native-upload --save-dev

# Yarn
yarn add react-native-upload --dev
```

### 2、生成配置

先执行这个命令：

npx upload-init

执行命令后会在项目根目录中创建一个 upload.json 文件，并生成以下内容：

// 未用到的配置，可以置空不填写，也可以直接删除
{

    // 上传到蒲公英
    "pgy": {
        // 上传凭证，访问链接 https://www.pgyer.com/account/api ，复制Api Key
        "pgy_api_key": "",
        // App安装方式，共有三种  1：公开，2：密码安装，3：邀请安装
        "pgy_install_type": 1,
        // App安装时的访问密码，选择 "2密码安装" 时，访问密码必填
        "pgy_install_password": "",
        "ios_export_plist": "./ios-export/ad-hoc.plist"
    },



    // 上传到fir.im
    "fir": {
        // 上传凭证，访问链接 https://betaqr.com/apps/apitoken ，复制token
        "fir_api_token": "",
        "ios_export_plist": "./ios-export/ad-hoc.plist"
    },



    // 上传到App Store
    "app_store": {
        ###########################################################################
        ## 注意：user_* 与 api_* 是互斥的，只需要填写其中一组即可正常上传                ##
        ###########################################################################

        // 用户（APPLE_ID）必须拥有该APP的上传权限
        "user_name": "",
        // 随机密码，访问链接 https://appleid.apple.com/account/manage ，点击 App专用密码 生成密码
        "user_password": "",

        // 秘钥ID，访问链接 https://appstoreconnect.apple.com/access/api ，点击蓝色圆形+号图标即可生成秘钥。
        ##########################################################################
        ## 注意：生成秘钥后，必须下载秘钥文件，并复制到以下随意一个文件夹中：              ##
        ##             ./private_keys                                           ##
        ##             ~/private_keys                                           ##
        ##             ~/.private_keys                                          ##
        ##             ~/.appstoreconnect/private_keys                          ##
        ##########################################################################
        "api_key": "",
        // 生成秘钥后，秘钥的列表上方有个 Issuer ID
        "api_issuer": "",

        "ios_export_plist": "./ios-export/app-store.plist"
    },



    // 上传到Test Flight
    // 默认从app_store配置中拿 user_* 或者 api_*，也可以在test_flight配置下覆盖这几个参数
    "test_flight": {
        "ios_export_plist": "./ios-export/ad-hoc.plist"
    }

}

### 3、自动打包上传
