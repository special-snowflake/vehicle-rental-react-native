import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import styles from '../styles/History';
import {numberToRupiah} from '../../modules/helpers/collection';

const defaultVehicle = require('../assets/images/car-default.jpg');

const CardHistory = ({navigation, data}) => {
  //   console.log('card history', el, idx);
  //   const [image, setImage] = useState(defaultVehicle);
  //   if (el.image !== null) {
  //     const newImage = imghost + el.image;
  //     setImage({uri: newImage});
  //   }
  const imghost = process.env.URL_API + '/vehicles';
  let elements = [];
  data.forEach((el, idx) => {
    console.log(el, idx);
    const uriImage = imghost + el.image;
    elements.push(
      <>
        <View style={styles.contentListWrapper}>
          <View style={{flex: 3}}>
            <View style={styles.contentImageWrapper}>
              <View style={{flex: 3}}>
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
              <View style={{flex: 3, height: 90}}>
                <Text style={{fontWeight: 'bold'}}>{el.name}</Text>
                <Text>{el.rental_date}</Text>
                <Text>Rp.{numberToRupiah(el.total_payment)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.checkboxWrapper}>
            <Text style={styles.textRight}>✅</Text>
          </View>
        </View>
      </>,
    );
  });
  return elements;
};

export default CardHistory;
