import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import Example from './Date';

const Add = () => {
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [date, setDate] = useState('dd-mm-yyyy');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigation();

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
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

  const uploadItem = (url) => {
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
      })
      .catch((error) => {
        console.error('Error adding item:', error);
        Alert.alert('Error', 'Failed to add item. Please try again.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>ADD AN ITEM</Text>
        {imageData && (
          <Image
            source={{ uri: imageData.assets[0].uri }}
            style={styles.imageStyle}
          />
        )}
        <TextInput
          placeholder="Enter item name"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Enter item description"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Example setDate={setDate} />
        <Picker
          selectedValue={selectedCategory}
          style={[styles.pickerStyle]}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          <Picker.Item label="Force" value="Force" />
          <Picker.Item label="Dance" value="Dance" />
          <Picker.Item label="Epmoc" value="Epmoc" />
          <Picker.Item label="Enoua" value="Enoua" />
        </Picker>
        <Text>{selectedCategory}</Text>
        <TouchableOpacity style={styles.pickBtn} onPress={openGallery}>
          <Text style={styles.pickBtnText}>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} onPress={uploadImage}>
          <Text style={styles.uploadBtnText}>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputStyle: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  pickerStyle: {
    height: 50,
    paddingLeft: 20,
    color:'black',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop:20
  },
  imageStyle: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  pickBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#5246f2',
  },
  pickBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  uploadBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1abc9c',
  },
  uploadBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Add;
