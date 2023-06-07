import { StyleSheet, View, Animated, useWindowDimensions, Text } from 'react-native'
import React from 'react'
import { ListData } from './Flatlistdata';

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();


  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignContent: 'center', }}>
    <View style={{ flexDirection: 'row', height: 64, }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#808080', '#288400', '#808080'], // Green for active page, white for others
          extrapolate: 'clamp',
        });

        const indicatorWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 15, 10],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.indicator, { width: indicatorWidth, backgroundColor}]}
            key={i.toString()}
          />
        );
      })}
    </View>
    </View>
  );
};


export default Paginator

const styles = StyleSheet.create({
    indicator: {
        height: 7,
        borderRadius: 100,
        // backgroundColor: '#288400',
        marginHorizontal: 5,
        justifyContent: 'center', 
        alignContent: 'center',
    }
})