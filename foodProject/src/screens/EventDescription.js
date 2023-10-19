import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const EventDescription = ({route}) => {
    const { event } = route.params;
    console.log(event)
  return (
    <Container>
      <PageHeading>Event Description</PageHeading>
      <EventImage
        source={{
          uri:
            event.imageUrl,
        }}
      />
      <TextContainer>
        <Title>{event.name}</Title>
        <Description>{event.description}.</Description>
        <DetailsRow>
          <DetailLabel>Registration Date:</DetailLabel>
          <DetailText>{event.date}</DetailText>
        </DetailsRow>
        <DetailsRow>
          <DetailLabel>Organizers:</DetailLabel>
          <DetailText>{event.category} club </DetailText>
        </DetailsRow>
        <ApplyButton>
          <ApplyButtonText>Apply Now</ApplyButtonText>
        </ApplyButton>
      </TextContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
 
  background-color: rgb(231 229 228);
  padding: 20px; /* Add padding to all sides */
`;

const EventImage = styled.Image`
  width: 100%;
  height: 250px;
  border-radius:20px;
`;

const TextContainer = styled.View`
background-color: rgb(203 213 225);
  width: 100%;
  padding: 20px;
  margin:10px 0px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
  margin-top: 10px;
  color: #333;
`;

const Description = styled.Text`
  font-size: 16px;
  margin-top: 10px;
  color: #555;
`;

const DetailsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const DetailLabel = styled.Text`
  font-weight: bold;
  color: #555;
`;

const DetailText = styled.Text`
  margin-left: 5px;
  color: #777;
`;

const ApplyButton = styled.TouchableOpacity`
background-color: rgb(39 39 42);
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const ApplyButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
const PageHeading=styled.Text`
color:black;
font-size:40px;
font-weight:600;
font-style:italic;
padding:0px 0px 8px 0px;

`

export default EventDescription;
