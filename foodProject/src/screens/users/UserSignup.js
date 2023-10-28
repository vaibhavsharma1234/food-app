import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Loader from '../common/Loader';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const UserSignup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const saveUser = () => {
    setModalVisible(true);
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
        cart: [],
      })
      .then((res) => {
        setModalVisible(false);
        navigation.goBack();
      })
      .catch((error) => {
        setModalVisible(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Name"
        placeholderTextColor="black" 
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email ID"
        placeholderTextColor="black" 
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Mobile"
        placeholderTextColor="black" 
        keyboardType="number-pad"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        placeholderTextColor="black" 
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => {
          if (
            email !== '' &&
            password !== '' &&
            name !== '' &&
            mobile !== '' &&
            mobile.length > 9
          ) {
            saveUser();
          } else {
            alert('Please Enter All Required Data');
          }
        }}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
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
  signupBtn: {
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

export default UserSignup;
