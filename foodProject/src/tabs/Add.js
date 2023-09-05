import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Add = () => {
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState('');
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
  const uploadImage = async () => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    // setImageUrl(url)
    uploadItem(url)
  };
  const uploadItem = url => {
    firestore()
      .collection('items')
      .add({
        name: name,
        price:price,
        discountPrice:discountPrice,
        description:description,
        imageUrl:url+'',
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> ADD A ITEM </Text>
        </View>
        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.imageStyle}
          />
        ) : null}
        <TextInput
          placeholder="Enter Item name "
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={name}
          onChangeText={text => setName(text)}

        />
        <TextInput
          placeholder="Enter Item Price "
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={price}
          onChangeText={text => setPrice(text)}

        />
        <TextInput
          placeholder="Enter Item Discount Price "
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={discountPrice}
          onChangeText={text => setDiscountPrice(text)}
        />
        <TextInput
          placeholder="Enter Item Description "
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={description}
          onChangeText={text => setDescription(text)}

        />
        <TextInput
          placeholder="Enter Item Image Url "
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}

        />
        <Text style={{alignSelf: 'center', marginTop: 20, color: '#000'}}>
          OR
        </Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => requestCameraPermission()}>
          <Text style={{color: 'black'}}>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => uploadImage()}>
          <Text style={{}}>Upload Item</Text>
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
    fontSize: 18,
    fontWeight: '800',
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
