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
            <Text style={[styles.textCard]}>{item.name}</Text>
            <Text style={[styles.textCard]}>{item.shorting_no}</Text>
            <Text style={[styles.textCard]}>{item.opening_time}</Text>
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
    marginLeft: 5,
    marginTop: 7,
    zIndex:2
  },
  textCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7e07a6',
    marginBottom: 20,
  },
});
