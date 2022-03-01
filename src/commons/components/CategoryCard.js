import {View, Text, Image} from 'react-native';
import React from 'react';
import style from '../styles/CategoryCard';
import {numberToRupiah} from '../../modules/helpers/collection';
import {TouchableOpacity} from 'react-native-gesture-handler';

const imagehost = process.env.URL_API + '/vehicles';

const CategoryCard = ({navigation, data}) => {
  const elements = [];
  if (data.length === 0) {
    return (
      <View>
        <Text>Nothing to show</Text>
      </View>
    );
  }
  data.forEach((element, idx) => {
    const uriImage = imagehost + element.image;
    elements.push(
      <TouchableOpacity
        key={idx}
        onPress={() => {
          navigation.navigate('DetailVehicle', element.id);
        }}>
        <View style={style.cardWrapper}>
          <View style={style.left}>
            <Image
              source={{uri: uriImage}}
              style={style.image}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>
          <View style={style.right}>
            <Text style={{fontWeight: 'bold'}}>{element.name}</Text>
            <Text>Max 2 person.</Text>
            <Text>Available</Text>
            <Text>Rp.{numberToRupiah(element.price)}/day</Text>
          </View>
        </View>
      </TouchableOpacity>,
    );
  });
  return elements;
};

export default CategoryCard;
