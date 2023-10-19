import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';

import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
const EditItem = ({navigation}) => {
  const route = useRoute();
  const [imageData, setImageData] = useState({
    assets: [{uri: route.params.data.imageUrl}],
  });
  const [name, setName] = useState(route.params.data.name);
  // const [price, setPrice] = useState(route.params.data.price);
  const [date, setDate] = useState(route.params.data.date);
  const [category, setCategory] = useState(route.params.data.category);
  const [description, setDescription] = useState(route.params.data.description);
  const [imageUrl, setImageUrl] = useState('');
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };

  const uplaodImage = async () => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    uploadItem(url);
  };

  const uploadItem = () => {
    firestore()
      .collection('items')
      .doc(route.params.id)
      .update({
        name: name,
        category: category,
        date: date,
        description: description,
        imageUrl: route.params.data.imageUrl + '',
      })
      .then(() => {
        console.log('User added!');
        navigation.goBack();
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Item</Text>
        </View>

        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.imageStyle}
          />
        ) : null}
        <TextInput
          placeholder="Enter event Name"
          placeholderTextColor="black"
          style={styles.inputStyle}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Enter event date"
          style={styles.inputStyle}
          placeholderTextColor="black"
          value={date}
          onChangeText={text => setDate(text)}
        />
               <Picker
          selectedValue={category}
          
          style={[{backgroundColor: 'rgb(226 232 240)',width:'80%'},styles.pickerStyle]}
          onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)
           
            
          }>
          <Picker.Item style={{borderRadius:10,backgroundColor:'rgb(226 232 240)',padding:10,fontSize:20}} label="Force" value="Force" />
          <Picker.Item style={{borderRadius:10,backgroundColor:'gray',padding:10,fontSize:20}} label="dance" value="dance" />
          <Picker.Item style={{borderRadius:10,backgroundColor:'rgb(226 232 240)',padding:10,fontSize:20}} label="Epmoc" value="Epmoc" />
        </Picker>
        <TextInput
          placeholder="Enter Item Description"
          placeholderTextColor="black"
          style={styles.inputStyle}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        {/* <TextInput
          placeholder="Enter Item Image URL"
          placeholderTextColor="black"
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        /> */}
        <Text style={{alignSelf: 'center', marginTop: 20,color:'black'}}>OR</Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            requestCameraPermission();
          }}>
          <Text style={{color:'black'}}>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            uploadItem();
          }}>
          <Text style={{color: '#Fff'}}>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  pickerStyle: {
    width: '90%',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,           // Add this to set the border width
    borderColor: 'gray',     // Add this to set the border color
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    color: '#000',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center',
    color: '#000',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color:'black',
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  imageStyle: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});
