import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

/*
useImperativeHandle 应当与 forwardRef 一起使用

父、子组件在使用该hook时步骤如下：

    父组件使用useRef(或createRef)创建一个ref对象，将这个ref对象赋给子组件的ref属性
    子组件使用forwardRef包装自己，允许作为函数组件的自己使用ref。然后使用useImperativeHandle钩
    子函数，在该钩子函数的第二个函数参数中返回一些状态或方法，这个被返回的状态或方法就可以被父组件访
    问到。
    父组件使用创建的ref对象的current属性获取子组件暴露出的状态或方法。

作者：就问你怕不怕
链接：http://events.jianshu.io/p/d0108cfae1d2
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

*/

let SonCompment = (props: any, ref: React.Ref<unknown> | undefined) => {
  const [val, setVal] = useState(0);

  useImperativeHandle(ref, () => ({
    getInfo,
    changeVal: (newVal: any) => {
      const a = val + 1 + newVal;
      setVal(a);
    },
    refreshInfo: () => {
      console.log('子组件refreshInfo方法');
    },
  }));

  const getInfo = () => {
    console.log('子组件getInfo方法');
  };

  return <Text>子组件{val}</Text>;
};
export default forwardRef(SonCompment);
