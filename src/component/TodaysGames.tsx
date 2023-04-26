import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

interface TodaysGamesProps {}

interface TodaysGamesStates {}

const Games = [
  { id: 1, game: 'VIP DIAMOND', result: '77', time: '1:30PM' },
  { id: 2, game: 'Taj', result: '60', time: '2:30PM' },
  { id: 3, game: 'VIP SATTA', result: '69', time: '4:30PM' },
  { id: 4, game: 'Taj', result: '77', time: '1:30PM' },
  { id: 5, game: 'AH', result: '77', time: '1:30PM' },
];

const TodaysGames: React.FC<TodaysGamesProps> = () => {
  useEffect(() => {}, []);

  return (
    <View style={{}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={Games}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.textCard]}>{item.game}</Text>
            <Text style={[styles.textCard]}>{item.result}</Text>
            <Text style={[styles.textCard]}>{item.time}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TodaysGames;
const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: 'white',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft:5,
    marginTop:7
  },
  textCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7e07a6',
    marginBottom: 20,
  },
});
