import {View, Text, Image} from 'react-native';
import React from 'react';
import style from '../styles/Card';

const host = process.env.URL_API;

const ListVehicle = data => {
  const elements = [];
  const list = data.data;
  list.map((element, idx) => {
    const id = element.id;
    const image = host + '/vehicles' + element.image;
    console.log('image vehicle ', image);
    // console.log(element.name, element.price, idx);
    elements.push(
      <View key={id}>
        <Image source={{uri: image}} style={style.cardVehicles} />
      </View>,
    );
  });
  return elements;
};

export default ListVehicle;
