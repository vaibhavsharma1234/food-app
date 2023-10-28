import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const EventItem = ({ event, onPress }) => {
  return (
    <TouchableEventItem onPress={() => onPress(event)}>
      <EventImage source={{ uri: event.imageUrl }} />
      <EventDetails>
        <EventTitle>{event.name}</EventTitle>
        <EventDate>{event.date}</EventDate>
        <EventTag isUpcoming={event.tag === 'upcoming'}>{event.tag}</EventTag>
        <EventCategory>Category {event.category}</EventCategory>
        <EventLocation>{event.description}</EventLocation>
      </EventDetails>
    </TouchableEventItem>
  );
};

export default EventItem;

const TouchableEventItem = styled(TouchableOpacity)`
  margin: 8px;
`;

const EventImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const EventDetails = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
`;

const EventTitle = styled.Text`
  font-size: 20px;
  font-family: 'PlaypenSans-SemiBold';
  color: black;
`;

const EventCategory = styled.Text`
  font-size: 16px;
  font-family: 'PlaypenSans-Light';
  color: black;
`;

const EventDate = styled.Text`
  font-size: 16px;
  color: #888;
  font-family: 'PlaypenSans-Regular';
`;

const EventTag = styled.Text`
  font-size: 20px;
  font-family: 'PlaypenSans-SemiBold';
  color: ${(props) => (props.isUpcoming ? 'red' : 'black')};
`;

const EventLocation = styled.Text`
  font-size: 16px;
  color: #888;
  font-family: 'PlaypenSans-Regular';
`;
