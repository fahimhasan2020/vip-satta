import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, StatusBar } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export const HowToPlay = () => {
  const [playing, setPlaying] = useState(true);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: 'white' }}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />

    </View>
  );
}

export default HowToPlay;