import React, { useRef, useEffect } from 'react';
import { Animated, ScrollView, Text } from 'react-native';

interface ScrollingTextProps {
  text: string;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ text }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 7000,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 20 }}
    >
      <Animated.View
        style={{
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [200, -300],
              }),
            },
          ],
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#05f0ec', textTransform: 'uppercase' }}>{text}</Text>
      </Animated.View>
    </ScrollView>
  );
};

export default ScrollingText;
