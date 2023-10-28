// api.js

import firestore from '@react-native-firebase/firestore';


const registerForEvent = (userId, eventId) => {
  const usersRef = firestore().collection('users');
  const eventsRef = firestore().collection('items');

  // Add the event registration to the user's document
  usersRef
    .doc(userId)
    .update({
      registeredEvents: firestore.FieldValue.arrayUnion(eventId),
    });

  // Add the user's reference to the event's document
  eventsRef
    .doc(eventId)
    .update({
      attendees: firestore.FieldValue.arrayUnion(usersRef.doc(userId)),
    });
};

const getRegisteredUsersForEvent = async (eventId) => {
  try {
    const eventRef = firestore().collection('items').doc(eventId);

    // Get the event document
    const eventSnapshot = await eventRef.get();

    if (eventSnapshot.exists) {
      // Get the attendees array from the event document
      const attendees = eventSnapshot.data().attendees;

      if (attendees && attendees.length > 0) {
        // Get user data for each attendee
        const attendeesData = await Promise.all(
          attendees.map(async (userRef) => {
            const userSnapshot = await userRef.get();
            return userSnapshot.data();
          })
        );

        return attendeesData;
      } else {
        console.log('No attendees found for this event.');
        return [];
      }
    } else {
      console.log('Event not found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting registered users for the event:', error);
    return null;
  }
};
const getRegisteredEventsForUser = async (userId) => {
    try {
      console.log('Fetching events for user:', userId);
  
      const eventsRef = firestore().collection('items');
  
      // Create a reference to the user
      const userRef = firestore().doc(`users/${userId}`);
  
      // Query events where the user's reference is in the attendees array
      const userEventsSnapshot = await eventsRef
        .where('attendees', 'array-contains', userRef)
        .get();
  
      if (userEventsSnapshot.empty) {
        console.log('No events found for this user.');
        return [];
      }
  
      // Retrieve event data for each event
      const userEventsData = userEventsSnapshot.docs.map((eventDoc) => eventDoc.data());
  
      console.log('Registered Events:', userEventsData);
      return userEventsData;
    } catch (error) {
      console.error('Error getting registered events for the user:', error);
      return null;
    }
  };
  const isRegisteredForEvent = async (userId, eventId) => {
    try {
      // Fetch the list of events registered by the user
      const registeredEvents = await getRegisteredEventsForUser(userId);
  
      // Check if the event ID is in the list of registered events
      return registeredEvents.includes(eventId);
    } catch (error) {
      // Handle any potential errors (e.g., network request or data retrieval errors)
      console.error('Error checking registration status:', error);
      return false; // Return false if an error occurs
    }
  };
  
  export  {isRegisteredForEvent}
  export { getRegisteredEventsForUser };

export { getRegisteredUsersForEvent };

export { registerForEvent };
