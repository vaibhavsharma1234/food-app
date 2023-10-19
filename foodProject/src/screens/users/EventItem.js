import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const EventItem = ({ event, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(event)}>
      <Container>
        <EventImage source={{ uri: event.imageUrl }} />
        <EventTitle>{event.name}</EventTitle>
        <EventDate>{event.date}</EventDate>
        <EventCategory>Category {event.category}</EventCategory>
        <EventLocation>{event.description}</EventLocation>
      </Container>
    </TouchableOpacity>
  );
};

export default EventItem;

const Container = styled.View`
  background-color: #fff;
  padding: 16px;
  margin: 8px;
  border-radius: 10px;
`;

const EventImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const EventTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color:black;
`;
const EventCategory= styled.Text`
font-size: 16px;

color:black;
`;

const EventDate = styled.Text`
  font-size: 16px;
  color: #888;

`;

const EventLocation = styled.Text`
  font-size: 16px;
  color: #888;
`;
