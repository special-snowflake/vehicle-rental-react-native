import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles/History';
import {numberToRupiah} from '../../modules/helpers/collection';
// import {Checkbox} from 'react-native-paper';

const defaultVehicle = require('../assets/images/car-default.jpg');

const CardFavourite = ({navigation, data}) => {
  console.log('data fav', data);
  const [checked, setChecked] = useState([]);
  const imghost = process.env.URL_API + '/vehicles';
  let elements = [];
  console.log('inside checked', checked);

  useEffect(() => {}, [checked, setChecked]);

  data.forEach((el, idx) => {
    console.log(el, idx);
    const uriImage = imghost + el.image;
    elements.push(
      <View style={styles.contentListWrapper} key={`History-${idx}`}>
        <View style={styles.flex6}>
          <TouchableOpacity
            style={styles.contentImageWrapper}
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'DetailVehicle',
                params: el.history_id,
              });
            }}>
            <View style={styles.flex3}>
              <Image
                source={{uri: uriImage}}
                onError={({currentTarget}) => {
                  currentTarget.onerror = null;
                  currentTarget.src = {defaultVehicle};
                }}
                resizeMethod="resize"
                resizeMode="cover"
                style={styles.contentImage}
              />
            </View>
            <View style={styles.boxInfo}>
              <Text style={styles.fwBold}>{el.name}</Text>
              <Text>{el.city}, Indonesia</Text>
              <Text>Rp.{numberToRupiah(el.price)}</Text>
              {/* <Text>{el.return_status}</Text> */}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxWrapper}>
          <Text style={styles.textRight}>♥</Text>
        </View>
      </View>,
    );
  });
  return elements;
};

export default CardFavourite;
