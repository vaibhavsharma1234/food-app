import React, { useState } from 'react';
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Example from '../tabs/Date';
import { Picker } from '@react-native-picker/picker';

const EditItem = ({ navigation }) => {
  const route = useRoute();
  const [imageData, setImageData] = useState({
    assets: [{ uri: route.params.data.imageUrl }],
  });
  const [name, setName] = useState(route.params.data.name);
  const [date, setDate] = useState(route.params.data.date);
  const [category, setCategory] = useState(route.params.data.category);
  const [description, setDescription] = useState(route.params.data.description);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel) {
      setImageData(result);
    }
  };

  const uplaodImage = async () => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;

    try {
      await reference.putFile(pathToFile);
      const url = await storage()
        .ref(imageData.assets[0].fileName)
        .getDownloadURL();
      uploadItem(url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const uploadItem = (url) => {
    firestore()
      .collection('items')
      .doc(route.params.id)
      .update({
        name: name,
        category: category,
        date: date,
        description: description,
        imageUrl: url,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Item</Text>
        </View>
        {imageData !== null ? (
          <Image
            source={{ uri: imageData.assets[0].uri }}
            style={styles.imageStyle}
          />
        ) : null}
        <TextInput
          placeholder="Enter Item Name"
          placeholderTextColor="black"
          style={styles.inputStyle}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Example  setDate={setDate} />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
            }>
            <Picker.Item label="Force" value="Force" />
            <Picker.Item label="Dance" value="Dance" />
            <Picker.Item label="Epmoc" value="Epmoc" />
            <Picker.Item label="Enoua" value="Enoua" />
          </Picker>
        </View>
        <TextInput
          placeholder="Enter Item Description"
          placeholderTextColor="black"
          style={styles.inputStyle}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            requestCameraPermission();
          }}>
          <Text style={styles.pickBtnText}>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            uplaodImage();
          }}>
          <Text style={styles.uploadBtnText}>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
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
    fontWeight: 'bold',
    color: 'black',
  },
  inputStyle: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    marginTop: 20,
    marginBottom:10,
    backgroundColor: 'white',
    color: 'black',
  },
  pickerContainer: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 20,
    color:'black',
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    color:'black',
    borderWidth: 0,
  },
  imageStyle: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  orText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  pickBtn: {
    width: '100%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
  },
  pickBtnText: {
    color: 'black',
  },
  uploadBtn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#5246f2',
  },
  uploadBtnText: {
    color: 'white',
  },
});

export default EditItem;
