import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import EventItem from './EventItem';
import { useNavigation } from '@react-navigation/native';
const EventCard = ({ event }) => (
  <View style={styles.eventCard}>
    <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
    <View style={styles.eventDetails}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDate}>{event.date}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
    </View>
  </View>
);

const PastEvents = ({ route }) => {
  const [events, setEvents] = useState([]);
  const navigation =useNavigation()
  const { category } = route.params;
    const handleEventPress = (event) => {
    navigation.navigate('EventDescription', { event });
  };


  useEffect(() => {
    const itemsCollection = firestore().collection('items');
    const currentDate = new Date(); // Current date

    itemsCollection
      .where('category', '==', category)
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        // Filter past events
        const pastEvents = data.filter((event) => {
          const eventDateStr = event.date; // Assuming date is in "dd/mm/yyyy" format
          // Convert the event date format to "yyyy-mm-dd" for comparison
          const [day, month, year] = eventDateStr.split('/');
          const eventDateFormatted = `${year}-${month}-${day}`;
          return eventDateFormatted < currentDate.toISOString().slice(0, 10);
        });

        setEvents(pastEvents);
      });
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Past Events</Text>
      {
        events?.length>0?<FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventItem event={item} onPress={handleEventPress} />}
      />:<Text style={styles.heading}>no events available </Text>
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily:'PlaypenSans-Bold',
    marginBottom: 10,
    color: 'black',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2, // Adds a shadow to the card
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  eventDetails: {
    marginLeft: 15,
    flex: 1,
    color:'black'
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  eventDate: {
    fontSize: 16,
    color: 'gray',
  },
  eventDescription: {
    fontSize: 16,
    color: 'black',
  },
});

export default PastEvents;
