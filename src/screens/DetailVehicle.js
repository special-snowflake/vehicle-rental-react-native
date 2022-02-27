import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from '../commons/styles/DetailVehicle';
import {getVehicleDetail} from '../modules/utils/vehicles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {numberToRupiah} from '../modules/helpers/collection';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
const defaultCar = require('../commons/assets/images/car-default.jpg');

const imagehost = process.env.URL_API + '/vehicles';

const DetailVehicle = ({navigation, route}) => {
  const [dataVehicle, setDataVehicle] = useState(null);
  const [image, setImage] = useState(defaultCar);
  const [counter, setCounter] = useState(1);

  const handleCounter = val => {
    if (val === 'add') {
      if (dataVehicle.stock > counter) {
        const newCounter = counter + 1;
        setCounter(newCounter);
      }
    }
    if (val === 'sub') {
      if (counter > 1) {
        const newCounter = counter - 1;
        setCounter(newCounter);
      }
    }
  };

  useEffect(() => {
    getVehicleDetail(route.params)
      .then(res => {
        setDataVehicle(res.data.data);
        const newImage = imagehost + res.data.data.images[0];
        console.log('uri:image');
        setImage({uri: newImage});
        console.log(res.data.data);
      })
      .catch();
  }, [route]);
  return (
    <ScrollView style={style.container}>
      {dataVehicle ? (
        <>
          <View style={style.jumboTronWrapper}>
            <View style={style.backButton}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={require('../commons/assets/icons/back.png')}
                  resizeMode="contain"
                  style={style.iconBack}
                />
              </TouchableOpacity>
            </View>
            <ImageBackground
              source={image}
              style={style.jumboTron}
              onError={() => {
                setImage(defaultCar);
              }}
            />
          </View>
          <View style={style.headerWrapper}>
            <View style={style.itemLeft}>
              <Text style={style.contentHeader}>{dataVehicle.name}</Text>
              <Text style={style.contentHeader}>
                Rp.{numberToRupiah(dataVehicle.price)}/day
              </Text>
            </View>
            <View style={style.itemRight}>
              <Text>Right</Text>
            </View>
          </View>
          <View style={style.contentWrapper}>
            <Text>{dataVehicle.description}</Text>
            <Text style={{color: 'green'}}>{dataVehicle.status}</Text>
          </View>
          <View style={style.headerWrapper}>
            <View style={style.itemLeft}>
              <Text style={style.textSelect}>
                Select {dataVehicle.category}
              </Text>
            </View>
            <View
              style={{
                ...style.itemRight,
                ...style.counterWrapper,
                ...{backgroundColor: 'white'},
              }}>
              <TouchableOpacity
                style={style.counterButton}
                onPress={() => {
                  handleCounter('sub');
                }}>
                <Text style={style.textCenter}>-</Text>
              </TouchableOpacity>
              <Text style={style.textSelect}>{counter}</Text>
              <TouchableOpacity
                style={style.counterButton}
                onPress={() => {
                  handleCounter('add');
                }}>
                <Text style={style.textCenter}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{padding: 10, marginTop: 20}}>
            <TouchableOpacity style={style.buttonYellow}>
              <Text style={style.buttonText}>Reservation</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={style.marginLoading}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}
    </ScrollView>
  );
};

export default DetailVehicle;
