import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';

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
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
  };

  const deleteItem = docId => {
    firestore()
      .collection('items')
      .doc(docId)
      .delete()
      .then(() => {
        getItems();
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemView}>
            <Image source={{ uri: item.data.imageUrl }} style={styles.itemImage} />
            <View style={styles.itemInfoView}>
              <Text style={styles.nameText}>{item.data.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EventDetailsScreen', {
                    eventId: item.id,
                  });
                }}
                style={styles.showUsersButton}>
                <Text style={styles.showUsersButtonText}>Show Registered Users</Text>
              </TouchableOpacity>
              <Text style={styles.descText}>{item.data.description}</Text>
              <View style={styles.priceView}>
                <Text style={styles.priceText}>{item.data.category}</Text>
                <Text style={styles.discountText}>Date: {item.data.date}</Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditItem', {
                    data: item.data,
                    id: item.id,
                  });
                }}>
                <Image source={require('../images/editing.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Image source={require('../images/delete.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
    padding: 10,
    backgroundColor: '#f2f2f2', // Background color
  },
  itemView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 10,
  },
  itemInfoView: {
    flex: 1,
    padding: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  showUsersButton: {
    backgroundColor: '#1abc9c', // Button background color
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  showUsersButtonText: {
    color: 'white', // Button text color
    textAlign: 'center',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    marginTop: 5,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 10,
  },
});

export default Items;
