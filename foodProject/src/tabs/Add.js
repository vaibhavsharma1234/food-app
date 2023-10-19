import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const categories = ['Music', 'Sports', 'Movies', 'Food', 'Tech']; // Customize this list

const Add = () => {
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [date, setDate] = useState('dd-mm-yyyy');
  const [selectedCategory, setSelectedCategory] = useState();
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
const navigation =useNavigation()
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (!result.didCancel) {
      setImageData(result);
    }
  };

  const uploadImage = async () => {
    if (!imageData) {
      console.log('Please select an image.');
      return;
    }


    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;

    try {
      // Upload the image to Firebase Storage
      await reference.putFile(pathToFile);

      // Get the image URL after uploading
      const url = await storage()
        .ref(imageData.assets[0].fileName)
        .getDownloadURL();

      // Call the function to upload the item with the image URL
      uploadItem(url);
      

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const uploadItem = url => {
    firestore()
      .collection('items')
      .add({
        name: name,
        date: date,
        category: selectedCategory,
        description: description,
        imageUrl: url,
      })
      .then(() => {
        Alert.alert('Success', 'Item added successfully', [
          { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
        ]);
        console.log('Item added successfully!');

      })
      .catch(error => {
        console.error('Error adding item:', error);
        
        Alert.alert('Error', 'Failed to add item. Please try again.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ADD AN ITEM</Text>
        </View>
        {imageData && (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.imageStyle}
          />
        )}
        <TextInput
          placeholder="Enter item name"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Enter item date"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={date}
          onChangeText={text => setDate(text)}

        />
        <Picker
          selectedValue={selectedCategory}
          
          style={[{backgroundColor: 'rgb(226 232 240)',width:'80%'},styles.pickerStyle]}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
           
            
          }>
          <Picker.Item style={{borderRadius:10,backgroundColor:'rgb(226 232 240)',padding:10,fontSize:20}} label="Force" value="Force" />
          <Picker.Item style={{borderRadius:10,backgroundColor:'gray',padding:10,fontSize:20}} label="dance" value="dance" />
          <Picker.Item style={{borderRadius:10,backgroundColor:'rgb(226 232 240)',padding:10,fontSize:20}} label="Epmoc" value="Epmoc" />
        </Picker>
        <Text>{selectedCategory}</Text>
        <TextInput
          placeholder="Enter item description"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Text style={{alignSelf: 'center', marginTop: 20, color: '#000'}}>
          OR
        </Text>
        <TouchableOpacity style={styles.pickBtn} onPress={openGallery}>
          <Text style={{color: 'black'}}>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} onPress={uploadImage}>
          <Text>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  headerText: {
    fontSize: 22,
    fontStyle:'italic',
    fontWeight: '800',
    color:'#000',
    textAlign:'center',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 30,
    color: '#000',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
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
  uploadBtn: {
    backgroundColor: '#5246f2',
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 70,
  },
  imageStyle: {
    height: 200,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Add;
