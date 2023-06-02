import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

interface TodaysGamesProps {
  games: Array<{ id: number; game: string; result: string; time: string }>;
}

interface TodaysGamesStates { }

const TodaysGames: React.FC<TodaysGamesProps> = ({ games }) => {
  useEffect(() => {

  }, []);

  return (
    <View style={{}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={games}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.textCard]}>{item.game_name}</Text>
            <Text style={[styles.textCard]}>{item.result}</Text>
            <Text style={[styles.textCard]}>{item.result_time}</Text>
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
    padding: 5,
    backgroundColor: 'white',
    width: 140,
    height: 140,
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
    marginRight: 28,
    marginBottom: 10,
    marginLeft: 5,
    marginTop: 7,
    zIndex: 2
  },
  textCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7e07a6',
    marginBottom: 20,
  },
});
