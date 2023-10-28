import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { registerForEvent } from './RegisterEvent';
import { getRegisteredUsersForEvent } from './RegisterEvent';
// Function to retrieve email from AsyncStorage
export const getEmailFromAsyncStorage = async () => {
  try {
    const email = await AsyncStorage.getItem('EMAIL');
    return email;
  } catch (error) {
    console.error('Error retrieving email from AsyncStorage:', error);
    return null;
  }
};

// Function to get the user from Firestore based on the email
export const getUserFromFirestore = async (email) => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

    if (userSnapshot.empty) {
      console.log('User not found');
      return null;
    }

    // Assuming there is only one user with a matching email
    const user = userSnapshot.docs[0].data();
    return user;
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    return null;
  }
};

// Example usage in a component
const fetchUserInformation = async () => {
  // Retrieve the email from AsyncStorage
  const userEmail = await getEmailFromAsyncStorage();

  if (userEmail) {
    // Use the email to get the user from Firestore
    const user = await getUserFromFirestore(userEmail);

    if (user) {
    //   console.log('User:', user.userId);
    //   console.log("event",event.id)
      return user
    //   registerForEvent( user.userId,event.id)
      
      // Now you have the user information to work with
    }
  } else {
    console.log('No user email found in AsyncStorage');
  }
};

const fetchRegisteredUsersForEvent = async (eventId) => {
    const registeredUsers = await getRegisteredUsersForEvent(eventId);
  
    if (registeredUsers) {
    //   console.log('Registered Users:', registeredUsers);
      return registeredUsers
      // Now you have the list of users registered for the event
    }
  };
 
export {fetchRegisteredUsersForEvent}

// Call the function to fetch the user information
export default fetchUserInformation
