import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import {TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
const Login = ({navigation}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  // useEffect(()=>{
  //   // firestore()
  //   // .collection('admin')
  //   // .add({
  //   //   email: 'admin@gmail.com',
  //   //   password: 'admin1234',
  //   // })
  //   // .then(() => {
  //   //   console.log('admin added!');
  //   // });
  //   // this above is done once 
  //   getData()
  // },[])
  const getData=async()=>{
    const users = await firestore().collection('admin').get();
    if(email===users.docs[0]._data.email && password===users.docs[0]._data.password){
      navigation.navigate('Dashboard')
    }else{
      alert('wrong email and password')
    }
    console.warn(users.docs[0]._data)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email ID"
        placeholderTextColor="black"
        
        value={email}
        onChangeText={txt=>setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        placeholderTextColor="black"
        value={password}
        onChangeText={txt=>setPassword(txt)}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={()=>{
        if(email!==""  && password!==""){
          getData()
        }else{
          alert("please enter all details")
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
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    borderColor: '#000',
    borderWidth: 2,
    paddingLeft: 20,
    height: 50,
    color:'#000',
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  loginBtn: {
    backgroundColor: 'orange',
    height: 50,
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    
    justifyContent:'center',
    alignItems:'center'
  },
  btnText:{
    fontSize:18,
    fontWeight:'600',
    color:'#000'
  }
});
export default Login;
