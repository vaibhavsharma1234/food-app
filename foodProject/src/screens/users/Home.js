import React, { useState,useEffect } from 'react';
import styled from 'styled-components/native';
import EventItem from './EventItem';
import notificationImg from '../../images/notification.png';
import search from '../../images/search.png';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import CategorySlider from './CategorySlider';

import firestore from '@react-native-firebase/firestore';
const events = [
  {
    id: 1,
    title: 'First Year Interview',
    date: 'October 20, 2023',
    location: 'Chitagni Hostel indoor auditorium',
    imageURL:
      'https://tse4.mm.bing.net/th?id=OIP.qy-jE27TmOHxpMVz_A-4OgHaEP&pid=Api&P=0&h=220',
  },
  {
    id: 2,
    title: 'Event 2',
    date: 'November 5, 2023',
    location: 'Location 2',
    imageURL:
    'https://tse4.mm.bing.net/th?id=OIP.qy-jE27TmOHxpMVz_A-4OgHaEP&pid=Api&P=0&h=220',
  },
  
  // Add more events as needed
];

const Home = ({ navigation }) => {
  const [items,setItems]=useState('')
  useEffect(() => {
    // Reference to the "items" collection in Firestore
    const itemsCollection = firestore().collection('items');

    // Fetch data from the collection
    itemsCollection.get().then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        // For each document in the collection, add it to the data array
        data.push({ id: doc.id, ...doc.data() });
      });

      // Set the retrieved data to the state
      setItems(data);

      // Log the items to the console
      console.log('Fetched items from Firebase:', data[0]);
    });
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleClick=()=>{
    console.warn("click  ")
  }
  const handleEventPress = (event) => {
    // Handle the event press, e.g., navigate to the event description screen
    navigation.navigate('EventDescription', { event });
  };
  const handleLogout = async () => {
    try {
      // Clear the AsyncStorage data or token used for authentication
      await AsyncStorage.removeItem('EMAIL'); // Change 'userToken' to your actual token key

      // You can navigate the user to the login screen or perform other actions
      // For example, you can use navigation.navigate('Login') if using React Navigation.
      navigation.navigate('SelectLogin'); // Replace 'Login' with your login screen name.
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  return (
    <Container>
      <Header>
        <Logo>
          <LogoText>
            EVE<TextSpan>NTO</TextSpan>
          </LogoText>
        </Logo>
        <IconContainer>
          <HeaderIcon source={notificationImg} />
          <HeaderIcon source={search} />
        </IconContainer>
        <LogoutButton onPress={handleLogout}>
          <LogoutButtonText>Logout</LogoutButtonText>
        </LogoutButton>
      </Header>
      <CategorySlider/>
      <EventList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventItem  event={item} onPress={handleEventPress} />
        )}
      />

    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  background-color: #fff; /* Dark gray background */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px; /* Increased padding for better spacing */
  align-items: center;
  margin: 8px;
`;

const Logo = styled.View``;

const LogoText = styled.Text`
  font-size: 30px;
  color: black; /* White text color */
  font-weight: bold;
`;

const TextSpan = styled.Text`
  color: red;
`;

const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
`;

const HeaderIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const EventList = styled.FlatList`
  padding: 16px; /* Increased padding for better spacing */
  background-color: #f2f2f2; /* Light gray background */
`;
const LogoutButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: #FF5733;
  border-radius: 5px;
`;

const LogoutButtonText = styled.Text`
  color: #000;
  font-weight: bold;
`;


// You can style your EventItem component using styled-components as well
