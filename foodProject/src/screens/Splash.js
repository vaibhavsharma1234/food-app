import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({navigation}) => {
useEffect(()=>{
setTimeout(()=>{
navigation.navigate('Login')
},3000)
},[])
  return (
    <View  style={styles.container}>
      <Text style={styles.logo} >Splash</Text>
    </View>
  )
}
const styles =StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    fontSize:30,
    color:'red',
    fontWeight:'800'
   
  }
})

export default Splash