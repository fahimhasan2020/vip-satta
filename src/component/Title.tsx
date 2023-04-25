import React from 'react';
import { StyleSheet } from 'react-native';
import { Svg, Defs, Stop, LinearGradient, Text as SvgText } from 'react-native-svg';




interface Props {
    title: String;
    colors: string[];
}

export const MainTitle: React.FC<Props> = ({ title, colors }) => {
    return (
        <Svg width="100%" height="100" viewBox="0 0 150 60">
            <Defs>
                <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                    <Stop offset="0" stopColor={colors[0]} />
                    <Stop offset="1" stopColor={colors[1]} />
                </LinearGradient>
            </Defs>
            <SvgText
        x="33%"
        y="50%"
        dx="2"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="url(#gradient)"
        stroke="#FFA500"
        strokeWidth="2"
        strokeOpacity="1"
      >
        {title}
      </SvgText>
            <SvgText
        x="35%"
        y="50%"
        dx="-2"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="url(#gradient)"
      >
        {title}
      </SvgText>
      
        </Svg>
    );
};

const styles = StyleSheet.create({
    textWhite: {
        color: 'white',
        fontWeight: 'bold'
    },
    gradient: {
        borderRadius: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        padding: 10,
    },

});
