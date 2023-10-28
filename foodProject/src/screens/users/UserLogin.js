import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader';

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const adminLogin = async () => {
    setModalVisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        setModalVisible(false);
        if (querySnapshot.docs[0].data()) {
          if (
            querySnapshot.docs[0].data().email === email &&
            querySnapshot.docs[0].data().password === password
          ) {
            goToNextScreen(
              querySnapshot.docs[0].data().userId,
              querySnapshot.docs[0].data().mobile,
              querySnapshot.docs[0].data().name
            );
          } else {
            alert('Please Check Email/Password');
          }
        } else {
          alert('User not found');
        }
      })
      .catch((error) => {
        setModalVisible(false);
        console.log(error);
        alert('Please Check Email/Password');
      });
  };

  const goToNextScreen = async (userId, mobile, name) => {
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    await AsyncStorage.setItem('MOBILE', mobile);
    await AsyncStorage.setItem('NAME', name);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email ID"
        placeholderTextColor="#000"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        placeholderTextColor="#000"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            alert('Please Enter Data');
          }
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.createNewAccount}
        onPress={() => {
          navigation.navigate('UserSignup');
        }}>
        Create New Account
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 30,
    color: '#000',
  },
  loginBtn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 50,
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  createNewAccount: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 50,
    alignSelf: 'center',
    color: 'black',
  },
});

export default UserLogin;
