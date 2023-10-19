import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const Items = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, [isFocused]);
  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
        console.log(tempData)
      });
  };

  const deleteItem = docId => {
    firestore()
      .collection('items')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getItems();
      });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemView}>
              <Image
                source={{uri: item.data.imageUrl}}
                style={styles.itemImage}
              />
              <View style={[styles.nameView,{color:'#000'}]}>
                
                <Text  style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.descText}>{item.data.description}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {item.data.category}
                  </Text>
                  <Text style={styles.discountText}>
                    { item.data.date}
                  </Text>
                </View>
              </View>
              <View style={{margin: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditItem', {
                      data: item.data,
                      id: item.id,
                    });
                  }}>
                  <Image
                    source={require('../images/editing.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteItem(item.id);
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={[styles.icon, {marginTop: 20,margin:-10}]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Items;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:100,
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,

    // color:'black',
    // backgroundColor:'red',
    marginBottom: 10,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    padding:5,
    margin: 5,
  },
  nameView: {
    width: '53%',
    margin: 10,
    color:'black',
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color:'black'
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
    color:'black'
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    
    marginLeft: 5,
    color:'black'
  },
  icon: {
    width: 30,
    height: 30,
    margin:-10,
  },
});