import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, Pressable } from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';


interface Props {
  label: String,
  data: String,
  setData: (data: string) => void;
  background: String,
  width: Number
}



export const PrimaryInput: React.FC<Props> = ({ label = 'Placeholder', data, setData, background = '#7e07a6', width = 60 }) => {
  const [labelShow, setLabelShow] = useState(false);

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
      <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
      <View style={{ marginLeft: 20, marginBottom: -10, zIndex: 2, width: width }}>
        {labelShow ? <Text style={[styles.textWhite, { width: width, paddingLeft: 5, backgroundColor: '#7e07a6' }]}>{label}</Text> : null}
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

export const PrimaryInputOtp: React.FC<Props> = ({ data, setData }) => {

  const handleFocus = () => {

  };


  const handleBlur = () => {

  };
  return (
    <View>
      <TextInput
        value={data.toString()}
        style={styles.primary}
        keyboardType='numeric'
        onChangeText={setData}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export const PrimaryPassword: React.FC<Props> = ({ label = 'Placeholder', data, setData, background = '#7e07a6', width = 60 }) => {
  const [labelShow, setLabelShow] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

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
      <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
      <View style={{ marginLeft: 20, marginBottom: -10, zIndex: 2, width: width }}>
        {labelShow ? <Text style={[styles.textWhite, { width: width, paddingLeft: 5, backgroundColor: '#7e07a6' }]}>{label}</Text> : null}
      </View>
      <TextInput
        secureTextEntry={showPassword}
        value={data.toString()}
        style={styles.primary}
        placeholder={label.toString()}
        onChangeText={setData}
        placeholderTextColor={!labelShow ? "#fff" : "transparent"}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showPassword ? <Pressable
        onPress={() => {
          setShowPassword(false);
        }} style={{ position: 'absolute', right: 16, bottom: 39, }}>
        <Entypo name="eye" size={21} color="#FFF" />
      </Pressable> : <Pressable onPress={() => {
        setShowPassword(true);
      }} style={{ position: 'absolute', right: 16, bottom: 39, }}>
        <Entypo name="eye-with-line" size={21} color="#FFF" />
      </Pressable>}


    </View>
  );
};
export const SecondaryPassword: React.FC<Props> = ({ label = 'Placeholder', data, setData, background = '#ffffff', width = 60 }) => {
  const [labelShow, setLabelShow] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

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
      <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
      <View style={{ marginLeft: 20, marginBottom: -10, zIndex: 2, width: width }}>
        {labelShow ? <Text style={[styles.textGrey, { width: width, paddingLeft: 5, backgroundColor: '#ffffff' }]}>{label}</Text> : null}
      </View>
      <TextInput
        secureTextEntry={showPassword}
        value={data.toString()}
        style={styles.secondary}
        placeholder={label.toString()}
        onChangeText={setData}
        placeholderTextColor={!labelShow ? "#ccc" : "transparent"}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showPassword ? <Pressable
        onPress={() => {
          setShowPassword(false);
        }} style={{ position: 'absolute', right: 16, bottom: 39, }}>
        <Entypo name="eye" size={21} color="#ccc" />
      </Pressable> : <Pressable onPress={() => {
        setShowPassword(true);
      }} style={{ position: 'absolute', right: 16, bottom: 39, }}>
        <Entypo name="eye-with-line" size={21} color="#ccc" />
      </Pressable>}


    </View>
  );
};
export const SecondaryInput: React.FC<Props> = ({ label = 'Placeholder', data, setData, background = '#ffffff', width = 60 }) => {
  const [labelShow, setLabelShow] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

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
      <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
      <View style={{ marginLeft: 20, marginBottom: -10, zIndex: 2, width: width }}>
        {labelShow ? <Text style={[styles.textGrey, { width: width, paddingLeft: 5, backgroundColor: '#ffffff' }]}>{label}</Text> : null}
      </View>
      <TextInput
       
        value={data.toString()}
        style={styles.secondary}
        placeholder={label.toString()}
        onChangeText={setData}
        placeholderTextColor={!labelShow ? "#ccc" : "transparent"}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  primary: {
    padding: 10,
    width: 300,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    borderRadius: 5,
    marginBottom: 20
  },
  secondary: {
    padding: 10,
    width: 300,
    borderWidth: 2,
    borderColor: '#ccc',
    color: '#ccc',
    borderRadius: 5,
    marginBottom: 20
  },
  textWhite: {
    color: 'white',
    fontWeight: 'bold',

  },
  textGrey: {
    color: '#ccc',
    fontWeight: 'bold',

  }
});
