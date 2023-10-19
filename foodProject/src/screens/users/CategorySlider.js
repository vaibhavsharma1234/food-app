import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const coding = require('../../images/coding.png');
const dance = require('../../images/dance.png');
const categories = [
  {
    id: 1,
    name: 'Force',
    image: coding,
  },
  {
    id: 2,
    name: 'dance',
    image: dance,
  },
  {
    id: 3,
    name: 'Epmoc',
    image: dance,
  },
];

const CategorySlider = () => {
  const navigation = useNavigation();

  const handleClick = (category) => {
    navigation.navigate("CategoryEvents", { category: category.name }); // Pass the category name
  };

  return (
    <Container>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} onPress={() => handleClick(category)}>
            <CategoryCard>
              <CategoryImage source={category.image} />
              <CategoryText>{category.name}</CategoryText>
            </CategoryCard>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Container>
  );
};

export default CategorySlider;

const Container = styled.View`
  display: flex;
  padding: 16px;
`;

const CategoryCard = styled.View`
  margin-right: 16px;
  width: 150px;
  background-color: #fff;
  border-radius: 8px;
  elevation: 5;
`;

const CategoryImage = styled.Image`
  width: 80%;
  height: 150px;
  margin: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CategoryText = styled.Text`
  text-align: center;
  font-weight: bold;
  margin-top: 8px;
  padding: 10px;
  color: #333;
  `
;
