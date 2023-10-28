import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { fetchRegisteredUsersForEvent } from '../screens/ResuableFunction';

const EventDetailsScreen = ({ route }) => {
  const { eventId } = route.params; // Pass the event ID from the navigation

  const [event, setEvent] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    // Retrieve event details
    firestore()
      .collection('items')
      .doc(eventId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setEvent(documentSnapshot.data());
        } else {
          console.log('Event not found');
        }
      });

    const getUser = async () => {
      const ans = await fetchRegisteredUsersForEvent(eventId);
      if (ans) {
        setRegisteredUsers(ans);
      }
    };
    getUser();
  }, []);
  const sendEventDetailsByEmail = (user) => {
    const eventDetails = `
      Event Name: ${event?.name}
      Date: ${event?.date}
      Category: ${event?.category}
      Description: ${event?.description}
    `;

    Linking.openURL(`mailto:${user.email}?subject=Event Details&body=${eventDetails}`);
  };
  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Event Details</Text>

    <View style={styles.eventCard}>
      {event?.imageUrl ? (
        <Image source={{ uri: event?.imageUrl }} style={styles.eventImage} />
      ) : (
        <Text style={styles.noImageText}>No Image Available</Text>
      )}
      <Text style={styles.eventName}>{event?.name}</Text>
      <Text style={styles.eventDate}>Date: {event?.date}</Text>
      <Text style={styles.eventCategory}>Category: {event?.category}</Text>
      <Text style={styles.eventDescription}>{event?.description}</Text>
    </View>

    <Text style={styles.subheading}>Registered Users:</Text>
    <FlatList
      data={registeredUsers}
      renderItem={({ item }) => (
        <View style={styles.userContainer}>
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userMobile}>{item.mobile}</Text>
          </View>
          <TouchableOpacity onPress={() => sendEventDetailsByEmail(item)} style={styles.sendEmailButton}>
            <Text style={styles.sendEmailButtonText}>Send Event Details via Email</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.userId}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Use a light gray background color
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  noImageText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 15,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    color: 'black',
  },
  eventCategory: {
    fontSize: 16,
    color: 'black',
  },
  eventDescription: {
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  sendEmailButton: {
    backgroundColor: '#1abc9c', // Button background color
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  sendEmailButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userContainer: {
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  userEmail: {
    fontSize: 16,
    color: 'black',
  },
  userMobile: {
    fontSize: 14,
    color: 'black',
  },
});

export default EventDetailsScreen;