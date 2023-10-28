import {StyleSheet,View,Text,Dimensions,TextInput,KeyboardAvoidingView,Pressable,Image,ScrollView,} from 'react-native';

export default function Point() {
  return (
    <ScrollView style={styles.hellow}>
    <View style={styles.container}>
      <View style={styles.userData}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg',
          }}
        />
      </View>
      <Text style={styles.name}>Force</Text>
      <Text style={styles.email}>Force mail</Text>
      <Text style={styles.detail}>Details</Text>
      


    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hellow:{
    backgroundColor: 'white', 
    flex: 1,
    marginTop:10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5
  },
  userData: {
    position: 'relative',
    height: 150,
    backgroundColor: '#047857',
    borderRadius: 15,
  },
  profilePhoto: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 999,
    borderColor: 'white',
    borderWidth: 4,
    left: '50%',
    bottom: '0%',
    transform: [{translateX: -50}, {translateY: 50}],
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 55,
  },
  email: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  detail:{
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 4,

  }
});