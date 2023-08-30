/* FComp 父组件 */
import {useRef} from 'react';
import {Button} from 'react-native';
import Son from './son';
const FatherCompment = () => {
  const childRef = useRef<any>();
  const updateChildState = () => {
    childRef.current?.changeVal(99);
  };
  return (
    <>
      <Son ref={childRef} />
      <Button
        title="主动调用子组件changeVal方法"
        onPress={() => childRef.current?.changeVal(99)}
      />
      <Button
        title="主动调用子组件getInfo方法"
        onPress={() => childRef.current?.getInfo()}
      />
    </>
  );
};

export default FatherCompment;
