import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getData = async () => {
    const users = await firestore().collection('admin').get();
    if (email === users.docs[0]._data.email && password === users.docs[0]._data.password) {
      await AsyncStorage.setItem('EMAIL', email);
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Error', 'Wrong email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
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
      <TouchableOpacity style={styles.loginBtn} onPress={() => {
        if (email !== "" && password !== "") {
          getData();
        } else {
          Alert.alert("Error", "Please enter all details");
        }
      }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 20,
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
});

export default Login;
