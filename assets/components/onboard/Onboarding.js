import { FlatList, StyleSheet, Text, View, Animated, Touchable, TouchableOpacity, Pressable } from 'react-native';
import { useState, useRef } from 'react';
import React, { useEffect } from 'react';
import { ListData } from './Flatlistdata';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);
  const { width } = useWindowDimensions();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);
  

  useEffect(() => {
    if (currentIndex.current >= ListData.length - 1) {
      AsyncStorage.setItem('@viewedOnboarding', 'true')
        .catch((err) => {
          console.log('Error @setItem: ', err);
        });
    }
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentIndex.current = viewableItems[0].index;
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX/width);
    setCurrentSlideIndex(currentIndex);
  }
   
  //To navigate to the next page
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != ListData.length) {
    const offset = nextSlideIndex * width;
    ref?.current?.scrollToOffset({offset});
    setCurrentSlideIndex(nextSlideIndex);
    }
  }
  
  //To navigate to the last page
    const Skip = () => {
      const lastSlideIndex = ListData.length - 1;
      const offset = lastSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(lastSlideIndex);
  }
  return (
    <View style={{ flex: 3 }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={ListData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24, }}>
        <Paginator data={ListData} scrollX={scrollX} />
        <View>
          {
            currentSlideIndex !== ListData.length - 1 ? 
                    <View style={{flexDirection: 'row', gap: 15}}>
        <TouchableOpacity onPress={Skip}><Text style={{color: '#288400', marginTop: -9}}>Skip</Text></TouchableOpacity> 
        <TouchableOpacity onPress={goNextSlide}><Text style={{color: '#288400', marginTop: -9}}>Next</Text></TouchableOpacity>  
        </View>  : null
          }
        </View>

      </View>
      <View>
      {/* Logic to render get started button only on the last page */}
          {
            currentSlideIndex == ListData.length - 1 ?
<View>
                      <TouchableOpacity onPress={() => navigation.replace("SignUp")}
                      style={{backgroundColor: '#42DA00', borderRadius: 20, alignContent: 'center' , 
                    marginHorizontal: 24, paddingTop: 15, paddingBottom: 15, paddingLeft: 12, paddingRight: 12}}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white', textAlign: 'center'}}>Get Started</Text>
        </TouchableOpacity>
<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom: 40, marginTop: 10  }}>
  <Text style={{ color: 'grey', marginRight: 5}}>Already have an account?</Text>
  <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
    <Text style={{ color: '#42DA00', fontWeight: 'bold' }}>Login</Text>
  </TouchableOpacity>
</View>

</View> : null
          }
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
