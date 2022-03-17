import {TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
const defaultVehicle = require('../assets/images/car-default.jpg');
const imagehost = process.env.URL_API + '/vehicles';
import styles from '../styles/Home';
const HomeCard = ({navigation, id, image, category}) => {
  const [imageState, setImage] = useState({uri: imagehost + image});
  return (
    <TouchableOpacity
      // key={`${category}-${id}`}
      onPress={() => {
        navigation.navigate('DetailVehicle', id);
      }}>
      <Image
        source={imageState}
        style={styles.cardVehicles}
        onError={({currentTarget}) => {
          currentTarget.onerror = null;
          setImage(defaultVehicle);
        }}
      />
    </TouchableOpacity>
  );
};

export default HomeCard;
