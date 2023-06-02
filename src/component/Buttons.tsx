import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  label: String;
  onPress: () => void,
  loading: boolean
}

export const PrimaryButton: React.FC<Props> = ({ label = 'Hi' }) => {
  return (
    <View>
      <TouchableOpacity style={styles.primary}>
        <Text style={styles.textWhite}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const ThemeButton: React.FC<Props> = ({ label = 'Hi' }) => {
  return (
    <View>
      <TouchableOpacity style={styles.theme}>
        <Text style={styles.textWhite}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const WarningButton: React.FC<Props> = ({ label = 'Hi', onPress, loading = false }) => {
  return (
    <View>
      <TouchableHighlight onPress={onPress} >
        <LinearGradient colors={['#ff5733', '#c73c1e', '#a3290f']} style={styles.warning}>
          {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.textWhite}>{label}</Text>}
        </LinearGradient>
      </TouchableHighlight>
    </View>
  );
};
export const DangerButton: React.FC<Props> = ({ label = 'Hi' }) => {
  return (
    <View>
      <TouchableOpacity style={styles.danger}>
        <Text style={styles.textWhite}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  primary: {
    padding: 10,
    width: 300,
    alignItems: 'center',
    backgroundColor: 'blue',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 3
  },
  textWhite: {
    color: 'white',
    fontWeight: 'bold'
  },
  theme: {
    padding: 10,
    width: 200,
    alignItems: 'center',
    backgroundColor: 'purple',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 3
  },
  warning: {
    padding: 10,
    width: 300,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 3
  },
  danger: {
    padding: 10,
    width: 200,
    alignItems: 'center',
    backgroundColor: 'red',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 3
  }
});
