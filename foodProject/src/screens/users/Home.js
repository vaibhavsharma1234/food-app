import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import EventItem from './EventItem';
import CategorySlider from './CategorySlider';

const Home = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const itemsCollection = firestore().collection('items');

    itemsCollection.get().then((querySnapshot) => {
      const data = [];
      const currentDate = new Date();

      querySnapshot.forEach((doc) => {
        const eventData = { id: doc.id, ...doc.data() };
        const eventDate = new Date(eventData.date.split('/').reverse().join('-'));

        eventData.tag = eventDate < currentDate ? 'completed' : 'upcoming';

        data.push(eventData);
      });

      data.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB - dateA;
      });

      setItems(data);
    });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredEvents = items.filter((item) =>
        item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredEvents);
    }
  };

  const handleEventPress = (event) => {
    navigation.navigate('EventDescription', { event });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('EMAIL');
      navigation.navigate('SelectLogin');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const handleMyEvents = () => {
    navigation.navigate('MyEvents');
  };

  return (
    <Container>
      <Header>
        <Logo>
          <LogoText>
            EVE<TextSpan>NTO</TextSpan>
          </LogoText>
        </Logo>
        <ButtonContainer>
          <LogoutButton onPress={handleLogout}>
            <ButtonLabel>Logout</ButtonLabel>
          </LogoutButton>
          <MyEventsButton onPress={handleMyEvents}>
            <ButtonLabel>My Events</ButtonLabel>
          </MyEventsButton>
        </ButtonContainer>
      </Header>
      <SearchContainer>
        <TextInput
          placeholder="Search events by name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <SearchButton>
          <SearchButtonText>Search</SearchButtonText>
        </SearchButton>
      </SearchContainer>
      <CategorySlider />
      <EventList>
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <EventItem key={item.id} event={item} onPress={handleEventPress} />
            ))
          : items.map((item) => (
              <EventItem key={item.id} event={item} onPress={handleEventPress} />
            ))}
      </EventList>
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;

const Header = styled.View`
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
`;

const Logo = styled.View``;

const LogoText = styled.Text`
  font-size: 30px;
  font-family: "PlaypenSans-Regular";
  color: black;
`;

const TextSpan = styled.Text`
  color: red;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ButtonLabel = styled.Text`
  color: black;
  font-family: "PlaypenSans-Regular";
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  background-color: #fff;
  border-radius: 5px;
  margin: 8px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  color: black;
  padding: 8px;
`;

const SearchButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: #1abc9c;
  border-radius: 5px;
`;

const SearchButtonText = styled.Text`
  color: black;
  font-family: "PlaypenSans-Regular";
`;

const EventList = styled.ScrollView`
  padding: 16px;
`;

const LogoutButton = styled.TouchableOpacity`
  padding: 8px 8px;
  background-color: #FF5733;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const MyEventsButton = styled.TouchableOpacity`
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #1abc9c;
  padding: 8px 16px;
`;
