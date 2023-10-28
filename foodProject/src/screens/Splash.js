import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
    setTimeout(() => {
      checkLogin();
    }, 3000);
  }, []);

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    if (email !== null && email !== 'admin@gmail.com') {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SelectLogin');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity: fadeAnim }]}>Evento</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Change the background color to your preference
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'red', // Customize the text color
  },
});

export default Splash;
