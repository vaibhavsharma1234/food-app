import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { fetchRegisteredUsersForEvent } from './ResuableFunction';
import { registerForEvent } from './RegisterEvent';
import fetchUserInformation from './ResuableFunction';

const EventDescription = ({ route }) => {
  const { event } = route.params;
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    async function checkRegistrationStatus() {
      // Fetch user information
      const userInformation = await fetchUserInformation(event);

      if (userInformation) {
        // Check if the user is registered for the event
        const registeredUsers = await fetchRegisteredUsersForEvent(event.id);
        const userIsRegistered = registeredUsers?.some(
          (user) => user.userId === userInformation.userId
        );

        setIsUserRegistered(userIsRegistered);
      }
    }

    checkRegistrationStatus();
  }, [event]);

  const handleRegistration = async () => {
    const userInformation = await fetchUserInformation(event);

    if (userInformation) {
      // Register the user for the event
      registerForEvent(userInformation.userId, event.id);
      setIsUserRegistered(true);
    }
  };

  return (
    <Container>
      <EventImage source={{ uri: event.imageUrl }} />
      <ContentContainer>
        <PageHeading>Event Description</PageHeading>
        <EventInfo>
          <Title>{event.name}</Title>
          <Description>{event.description}</Description>
          <DetailsRow>
            <DetailLabel>Registration Date:</DetailLabel>
            <DetailText>{event.date}</DetailText>
          </DetailsRow>
          <DetailsRow>
            <DetailLabel>Organizers:</DetailLabel>
            <DetailText>{event.category} club</DetailText>
          </DetailsRow>
        </EventInfo>
        {isUserRegistered ? (
          <ApplyButton disabled>
            <ApplyButtonText>Registered</ApplyButtonText>
          </ApplyButton>
        ) : (
          <ApplyButton onPress={handleRegistration}>
            <ApplyButtonText>Apply Now</ApplyButtonText>
          </ApplyButton>
        )}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;

const EventImage = styled.Image`
  width: 100%;
  height: 300px;
`;

const ContentContainer = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
`;

const PageHeading = styled.Text`
  font-size: 24px;
  font-family: 'PlaypenSans-Bold';
  color: #333;
`;

const EventInfo = styled.View`
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: 'PlaypenSans-SemiBold';
  color: #333;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
  font-family: 'PlaypenSans-Light';
`;

const DetailsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const DetailLabel = styled.Text`
  font-family: 'PlaypenSans-Bold';
  color: #555;
`;

const DetailText = styled.Text`
  margin-left: 5px;
  color: #777;
  font-family: 'PlaypenSans-ExtraLight';
`;

const ApplyButton = styled.TouchableOpacity`
  background-color: #1abc9c;
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const ApplyButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'PlaypenSans-Light';
`;

export default EventDescription;
