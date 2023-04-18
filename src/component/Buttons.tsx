import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

interface Props {
  label:String
}

export const PrimaryButton: React.FC<Props> = ({label='Hi'}) => {
  return (
    <View>
      <TouchableOpacity style={styles.primary}>
        <Text style={styles.textWhite}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const ThemeButton: React.FC<Props> = ({label='Hi'}) => {
  return (
    <View>
      <TouchableOpacity style={styles.theme}>
        <Text style={styles.textWhite}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const WarningButton: React.FC<Props> = ({label='Hi'}) => {
  return (
    <View>
      <TouchableOpacity style={styles.warning}>
        <Text style={styles.textWhite}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const DangerButton: React.FC<Props> = ({label='Hi'}) => {
  return (
    <View>
      <TouchableOpacity style={styles.danger}>
        <Text style={styles.textWhite}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  primary:{
    padding:10,
    width:300,
    alignItems:'center',
    backgroundColor:'blue',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius:3
  },
  textWhite:{
    color:'white',
    fontWeight:'bold'
  },
  theme:{padding:10,
    width:200,
    alignItems:'center',
    backgroundColor:'purple',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius:3},
  warning:{
    padding:10,
    width:300,
    alignItems:'center',
    backgroundColor:'orange',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius:3
  },
  danger:{
    padding:10,
    width:200,
    alignItems:'center',
    backgroundColor:'red',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius:3
  }
});
