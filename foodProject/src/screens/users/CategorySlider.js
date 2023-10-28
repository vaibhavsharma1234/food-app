import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import coding from '../../images/coding.png';
import dance from '../../images/dance.png';
import epmoc from '../../images/event-planner.png';
import enoua from '../../images/note.png';

const categories = [
  {
    id: 1,
    name: 'Force',
    image: coding,
  },
  {
    id: 2,
    name: 'Dance',
    image: dance,
  },
  {
    id: 3,
    name: 'Epmoc',
    image: epmoc,
  },
  {
    id: 4,
    name: 'Enoua',
    image: enoua,
  },
];

const CategorySlider = () => {
  const navigation = useNavigation();

  const handleClick = (category) => {
    navigation.navigate('CategoryEvents', { category: category.name });
  };

  return (
    <Container>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <CategoryItem key={category.id} onPress={() => handleClick(category)}>
            <CategoryCard>
              <CategoryImage source={category.image} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          </CategoryItem>
        ))}
      </ScrollView>
    </Container>
  );
};

export default CategorySlider;

const Container = styled.View`
  padding: 16px;
`;

const CategoryItem = styled(TouchableOpacity)`
  margin-right: 16px;
`;

const CategoryCard = styled.View`
  width: 100px;
  background-color: #fff;
  border-radius: 8px;
  elevation: 5;
`;

const CategoryImage = styled.Image`
  width: 100%;
  height: 100px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CategoryName = styled.Text`
  text-align: center;
  font-family: 'PlaypenSans-Bold';
  margin-top: 8px;
  padding: 10px;
  color: #333;
`;
