import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useState} from 'react'
import {TouchableOpacity} from 'react-native-gesture-handler';
import Items from '../tabs/Items';
import Transactions from '../tabs/Transactions';
import Add from '../tabs/Add';
import Orders from '../tabs/Orders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifications from '../tabs/Notifications';
import { useNavigation } from '@react-navigation/native';
const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      // Remove the user's email from AsyncStorage
      await AsyncStorage.removeItem('EMAIL');

      // Navigate to the select login page or the login screen of your choice
      navigation.navigate('SelectLogin'); // Replace 'SelectLogin' with your actual login screen name
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Items />
      ) : selectedTab == 1 ? (
        <Transactions />
      ) : selectedTab == 2 ? (
        <Add />
      ) : selectedTab == 3 ? (
        <Orders />
      ) : (
        <Notifications />
      )}
      <View style={styles.bottomView}>
        <TouchableOpacity style={[styles.bottomTab]} onPress={()=>setSelectedTab(0)}>
          <Image
            source={require('../images/items.png')}
            style={[styles.bottomTabImage,,{tintColor:selectedTab==0?'red':'black'}]}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.bottomTab]} onPress={()=>setSelectedTab(1)}>
          <Image
            source={require('../images/transaction.png')}
            style={[styles.bottomTabImage,{tintColor:selectedTab==1?'red':'black'}]}
          />
        </TouchableOpacity> */}
        <TouchableOpacity style={[styles.bottomTab]} onPress={()=>setSelectedTab(2)}>
          <Image
            source={require('../images/add.png')}
            style={[styles.bottomTabImage, {height: 35, width: 35},{tintColor:selectedTab==2?'red':'black'}]}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity style={[styles.bottomTab]} onPress={()=>setSelectedTab(4)}>
          <Image
            source={require('../images/notification.png')}
            style={[styles.bottomTabImage,,{tintColor:selectedTab==4?'red':'black'}]}
          />
        </TouchableOpacity> */}
        <TouchableOpacity style={[styles.bottomTab]} onPress={handleLogout}>
          <Image
            source={require('../images/logout.png')}
            style={[styles.bottomTabImage,,{tintColor:selectedTab==3?'red':'black'}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    height: 60,
    justifyContent: 'space-evenly',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#fff',
  },
  bottomTab: {
    height: '100%',
    // width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabImage: {
    width: 25,
    height: 25,
  },
});
export default Dashboard;
