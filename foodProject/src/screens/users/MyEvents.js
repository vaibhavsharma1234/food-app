import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import fetchUserInformation from '../ResuableFunction';
import { getRegisteredEventsForUser } from '../RegisterEvent';

const MyEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEventsForUser = async () => {
      const userInformation = await fetchUserInformation();
      if (userInformation) {
        const registeredEvents = await getRegisteredEventsForUser(userInformation.userId);
        console.log("registered events",registeredEvents)
        if (registeredEvents) {
          setRegisteredEvents(registeredEvents);
        }
      }
    };

    fetchRegisteredEventsForUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Registered Events</Text>
      <FlatList
        data={registeredEvents}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => (
          <View style={styles.card} key={item.id}>
            <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlaypenSans-Bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 20,
    fontFamily: 'PlaypenSans-SemiBold',
    color: '#333',
  },
  category: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'PlaypenSans-Bold',
  },
  date: {
    fontSize: 16,
    color: '#777',
    fontFamily: 'PlaypenSans-Regular',
  },
  description: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'PlaypenSans-Light',
  },
});

export default MyEvents;