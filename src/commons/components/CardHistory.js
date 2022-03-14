import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles/History';
import {numberToRupiah} from '../../modules/helpers/collection';
import {Checkbox} from 'react-native-paper';

const defaultVehicle = require('../assets/images/car-default.jpg');

const CardHistory = ({navigation, data, callback}) => {
  const [checked, setChecked] = useState([]);
  const imghost = process.env.URL_API + '/vehicles';
  let elements = [];

  const isBoxChecked = idx => {
    return checked.includes(idx);
  };
  const handleChecker = idx => {
    const isChecked = isBoxChecked(idx);
    if (!isChecked) {
      const newArr = [...checked];
      newArr.push(idx);
      setChecked(newArr);
      callback(newArr);
    } else {
      const index = checked.indexOf(idx);
      const newArr = [...checked];
      newArr.splice(index);
      console.log('bug 6');
      setChecked(newArr);
      callback(newArr);
    }
  };
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
              navigation.navigate('DetailHistory', el.history_id);
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
              <Text style={styles.fwBold}>{el.vehicle_name}</Text>
              <Text>{el.rental_date}</Text>
              <Text>Rp.{numberToRupiah(el.total_payment)}</Text>
              <Text>{el.return_status}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxWrapper}>
          <Text style={styles.textRight}>
            <Checkbox
              status={checked.includes(el.history_id) ? 'checked' : 'unchecked'}
              uncheckedColor="#393939"
              onPress={() => {
                handleChecker(el.history_id);
              }}
              color="#FFCD61"
            />
          </Text>
        </View>
      </View>,
    );
  });
  return elements;
};

export default CardHistory;
