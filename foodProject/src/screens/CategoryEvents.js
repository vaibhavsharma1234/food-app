import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Point from './CategoryHeader';
import {ScrollView} from 'react-native-gesture-handler';
const eventData = [
  {
    id: 1,
    title: 'First Year Interview',
    date: 'October 20, 2023',
    location: 'Chitagni Hostel indoor auditorium',
    imageURL:
      'https://tse4.mm.bing.net/th?id=OIP.qy-jE27TmOHxpMVz_A-4OgHaEP&pid=Api&P=0&h=220',
    category: 'Music',
  },
  {
    id: 2,
    title: 'Event 2',
    date: 'November 5, 2023',
    location: 'Location 2',
    imageURL:
      'https://tse4.mm.bing.net/th?id=OIP.qy-jE27TmOHxpMVz_A-4OgHaEP&pid=Api&P=0&h=220',
    category: 'Sports',
  },
  {
    id: 3,
    title: 'First Year Interview',
    date: 'October 20, 2023',
    location: 'Chitagni Hostel indoor auditorium',
    imageURL:
      'https://tse4.mm.bing.net/th?id=OIP.qy-jE27TmOHxpMVz_A-4OgHaEP&pid=Api&P=0&h=220',
    category: 'Music',
  },
  {
    id: 4,
    title: 'First Year Interview',
    date: 'October 20, 2023',
    location: 'Chitagni Hostel indoor auditorium',
    imageURL:
      'https://tse4.mm.bing.net/th?id=OIP.qy-jE27TmOHxpMVz_A-4OgHaEP&pid=Api&P=0&h=220',
    category: 'Music',
  },
  {
    id: 5,
    title: 'First Year Interview',
    date: 'October 20, 2023',
    location: 'Chitagni Hostel indoor auditorium',
    imageURL:
      'https://tse4.mm.bing.net/th?id=OIP.qy-jE27TmOHxpMVz_A-4OgHaEP&pid=Api&P=0&h=220',
    category: 'Music',
  },
  // Add more events as needed
];

const CategoryEvents = ({route}) => {
  const {category} = route.params;
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Reference to the "items" collection in Firestore
    const itemsCollection = firestore().collection('items');

    // Fetch data from the collection
    console.log(category);
    itemsCollection
      .where('category', '==', category) // Filter by category
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          // For each document in the collection, add it to the data array
          data.push({id: doc.id, ...doc.data()});
        });
       
        // Set the retrieved data to the state
        setEvents(data);

        // Log the items to the console
        console.log('Fetched items from Firebase:', data);
      });
  }, [category]);

  const filteredEvents = eventData.filter(event => event.category === category);
  const onPress = event => {
    navigation.navigate('EventDescription', {event});
  };
  return (
    <ScrollView>
      <Point category={category} />
      <Container>
     

        {/* {events.map(item => {
          return (
            <TouchableOpacity key={item.id} onPress={() => onPress(item)}>
              <EventCard>
                <EventImage source={{uri: item.imageUrl}} />
                <EventDetails>
                  <EventTitle>{item.name}</EventTitle>
                  <EventDate>{item.date}</EventDate>
                  <EventLocation>{item.description}</EventLocation>
                </EventDetails>
              </EventCard>
            </TouchableOpacity>
          );
        })} */}
   
      </Container>
    </ScrollView>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: #f4f4f4;
`;

const CategoryHeading = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 16px 0;
`;

const EventCard = styled(View)`
  background-color: #fff;
  padding: 16px;
  margin: 8px;
  border-radius: 10px;
`;

// const EventImage = styled.Image`
//   width: 100px;
//   height: 100px;
//   border-radius: 8px;
//   margin-right: 16px;
// `;

const EventDetails = styled(View)`
  flex: 1;
`;

// const EventTitle = styled(Text)`
//   font-size: 18px;
//   font-weight: bold;
//   color: #333;
// `;

// const EventDate = styled(Text)`
//   font-size: 14px;
//   color: #777;
//   margin: 8px 0;
// `;

// const EventLocation = styled(Text)`
//   font-size: 14px;
//   color: #777;
// `;
//
const EventImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const EventTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const EventDate = styled.Text`
  font-size: 16px;
  color: #888;
`;

const EventLocation = styled.Text`
  font-size: 16px;
  color: #888;
`;

export default CategoryEvents;
