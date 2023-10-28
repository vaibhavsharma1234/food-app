import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import firebase from '@react-native-firebase/app';

const Members = ({ route }) => {
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    const fetchMembers = () => {
      const clubName = 'Force';
      const membersRef = firebase.firestore().collection('clubs').doc(clubName).collection('members');

      membersRef
        .get()
        .then(function (querySnapshot) {
          const membersData = [];
          querySnapshot.forEach(function (doc) {
            membersData.push(doc.data());
          });
          membersData.sort((a, b) => {
            const positionOrder = ['FacultyCoordinators', 'OfficeBearers', 'Coordinators', 'Volunteers'];
            return positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position);
          });
          setMembersData(membersData);
        })
        .catch(function (error) {
          console.error('Error fetching data:', error);
        });
    };

    fetchMembers();
  }, []);

  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members of {category}</Text>
      <ScrollView style={styles.scrollContainer}>
        {membersData.map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Image source={{ uri: member.pic }} style={styles.memberImage} />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberDesignation}>{member.position}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
   fontFamily:'PlaypenSans-Bold',
    marginBottom: 20,
    color: 'black',

  },

  memberContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  memberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  memberInfo: {
    flex: 1,
   
  },
  memberName: {
    fontSize: 16,
    fontFamily:'PlaypenSans-Regular',
    color: 'black',
  },
  memberDesignation: {
    fontSize: 14,
    fontFamily:'PlaypenSans-Regular',
    color: 'gray',
  },
});
