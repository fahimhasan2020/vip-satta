import React, { useState, useCallback, useRef, } from "react";
import { Button, View, Alert, StatusBar,Dimensions,Image } from "react-native";
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
      <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height+100, top: 0, left: 0, opacity: 0.2 }} />
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