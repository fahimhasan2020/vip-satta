import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';

interface Props {
  label:String,
  data:String,
  setData: (data: string) => void;
  background:String,
  width:Number
}



export const PrimaryInput: React.FC<Props> = ({label='Placeholder',data,setData,background = 'red',width=60}) => {
  const [labelShow,setLabelShow] = useState(false);

  const handleFocus = () => {
    setLabelShow(true);
  };


  const handleBlur = () => {
    if (!data) {
      setLabelShow(false);
    }
  };
  return (
    <View>
      <View style={{marginLeft:20,marginBottom:-10,zIndex:2,width:width}}>
        {labelShow?<Text style={[styles.textWhite,{width:width,paddingLeft:5,backgroundColor:'red'}]}>{label}</Text>:null}
        </View>
      <TextInput 
      value={data.toString()} 
      style={styles.primary}
      placeholder={label.toString()}
      onChangeText={setData}
      placeholderTextColor={!labelShow ? "#fff" : "transparent"}
      onFocus={handleFocus}
      onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  primary:{
    padding:10,
    width:300,
    borderWidth:2,
    borderColor:'white',
    color:'white',
    borderRadius:5,
    marginBottom:10
  },
  textWhite:{
    color:'white',
    fontWeight:'bold',
   
  }
});
