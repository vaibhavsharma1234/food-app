import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categoryImages = {
  Force: 'https://media.licdn.com/dms/image/C4E1BAQELpaZSuF0wqA/company-background_10000/0/1592240808308/force_iiitu_cover?e=1698422400&v=beta&t=y__Ludc_p0gM_yYLPHoyLk9bOC2mecM4sOCStE68MXU',
  Dance:'https://tse2.mm.bing.net/th?id=OIP.B4oFqlQ5M8E71QzBn9t7LAHaEK&pid=Api&P=0&h=220',
  Epmoc:'https://media.licdn.com/dms/image/C4D1BAQFjzeFL3waCjA/company-background_10000/0/1593611104442/epmoc_iiitu_cover?e=1698422400&v=beta&t=1HnAvMst8KL-rn2tflJj8xtlWllVAgD4ELPDrt0OFhA',
  Enoua:'https://tse1.mm.bing.net/th?id=OIP.SYXoszFpKkFYvmItAJO0pAHaC2&pid=Api&P=0&h=220'

};
const mainImages={
  Force: 'https://force-iiitu.netlify.app/static/media/favicon.a78e0a3f85de348ebc11.png',
  Dance:'https://tse1.mm.bing.net/th?id=OIP.SYXoszFpKkFYvmItAJO0pAHaC2&pid=Api&P=0&h=220',
  Epmoc:'https://media.licdn.com/dms/image/C4D0BAQH1-XQyX8FnPQ/company-logo_200_200/0/1593589541087?e=1706140800&v=beta&t=EAoEz_WV_3Q8BobpJldk_ZYQPijlynd4cYoqT37MXDY',
  Enoua:'https://tse1.mm.bing.net/th?id=OIP.SYXoszFpKkFYvmItAJO0pAHaC2&pid=Api&P=0&h=220'
}
const content={
  Force: 'FORCE is the association of computer science in IIIT Una. Our main objective is to encourage open source software, improve coding culture, project building, and introducing new platforms to work on. It provides opportunities for students to broaden their knowledge in the field of computer science and interact with other students who have shared interests.',
  Dance:'The IIIT Una Dance Club is a dynamic hub for students passionate about dance, offering regular workshops and performances. It unites diverse dance styles, promoting both skill development and camaraderie. Through music and movement, it creates memorable experiences for the campus community.',
  Epmoc:'Event Planning Management and Organising Council. We here in EPMOC work together to manage all the minor events and major events held in transit campus-2 of our college IIIT Una.',
  Enoua:'Enoua, at IIIT Unna, is a literary hub where students share their passion for writing, poetry, and reading, cultivating a vibrant community of wordsmiths and book lovers.'
}

export default function Point({ category }) {
 
  const navigation = useNavigation();

  const handleViewMembers = () => {
    navigation.navigate('Members', { category });
  };

  const handleViewPastEvents = () => {
    navigation.navigate('PastEvents', { category });
  };

  const handleViewUpcomingEvents = () => {
    navigation.navigate('UpcomingEvents', { category });
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri:categoryImages[category]
        }}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.userData}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: mainImages[category],
            }}
          />
        </View>
      </ImageBackground>
      <Text style={styles.name}>{category}</Text>
      <Text style={styles.email}>{category}@iiitu.ac.in</Text>
      <Text style={styles.detail}>
        {
          content[category]
        }
      </Text>
      <TouchableOpacity onPress={handleViewMembers} style={styles.button}>
        <Text style={styles.buttonText}>View Members</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewPastEvents} style={styles.button}>
        <Text style={styles.buttonText}>View Past Events</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewUpcomingEvents} style={styles.button}>
        <Text style={styles.buttonText}>View Upcoming Events</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
  },
  userData: {
    position: 'relative',
    height: 150,
    backgroundColor: 'transparent',
    borderRadius: 15,
  },
  button: {
    backgroundColor: '#1abc9c',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
   fontFamily:'PlaypenSans-Light'
    
  },
  profilePhoto: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 4,
    left: '50%',
    bottom: '0%',
    transform: [{ translateX: -50 }, { translateY: 50 }],
  },
  name: {
    color: 'black',
   fontFamily:'PlaypenSans-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 40,
  },
  email: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    fontFamily:'PlaypenSans-SemiBold'
  },
  detail: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    
    fontFamily:'PlaypenSans-Regular'
  },
});
