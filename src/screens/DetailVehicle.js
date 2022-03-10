import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from '../commons/styles/DetailVehicle';
import {getVehicleDetail} from '../modules/utils/vehicles';
import {numberToRupiah} from '../modules/helpers/collection';
import {useSelector} from 'react-redux';
const defaultCar = require('../commons/assets/images/car-default.jpg');

import DateTimePicker from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';

const imagehost = process.env.URL_API + '/vehicles';

const DetailVehicle = ({navigation, route}) => {
  const [dataVehicle, setDataVehicle] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [image, setImage] = useState(defaultCar);
  const [counter, setCounter] = useState(1);
  const user = useSelector(state => state.auth.userData);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const day = [1, 2, 3, 4, 5, 6, 7];

  const handleDatePicker = date => {
    console.log('A date has been picked: ', date);
    setShowDate(false);
  };

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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chat');
                }}
                style={{width: 30}}>
                <Image
                  source={require('../commons/assets/icons/chat.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
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
          {user.token === '' || !user.token ? (
            <>
              <Text style={{marginTop: 15, textAlign: 'center', fontSize: 16}}>
                You need to login to make a reservation
              </Text>
              <View style={{padding: 10, marginTop: 20}}>
                <TouchableOpacity
                  style={style.buttonYellow}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={style.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : user.roles !== 'owner' ? (
            <>
              <View style={style.wrapperPicker}>
                <TouchableOpacity
                  style={style.pickerLeft}
                  onPress={() => {
                    setShowDate(true);
                  }}>
                  <Text style={{textAlign: 'center', fontSize: 16}}>
                    Select Date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.pickerRight}>
                  <Picker>
                    <Picker.Item
                      label="Prepayment (No Tax)"
                      value={'Prepayment'}
                    />
                    <Picker.Item
                      label="Pay At The End (Include Tax)"
                      value={'Pay At The End'}
                    />
                    <Picker.Item
                      label="Partial Payment (Include Tax)"
                      value={'Partial Payment'}
                    />
                  </Picker>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={showDate}
                  mode={'date'}
                  onConfirm={handleDatePicker}
                  onCancel={() => setShowDate(false)}
                />
              </View>
              <View style={{padding: 10, marginTop: 20}}>
                <TouchableOpacity
                  style={style.buttonYellow}
                  onPress={() => {
                    navigation.navigate('Transaction1', dataVehicle);
                  }}>
                  <Text style={style.buttonText}>Reservation</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <></>
          )}
          {user.id && user.id === dataVehicle.user_id ? (
            <View style={{padding: 10, marginTop: 20}}>
              <TouchableOpacity style={style.buttonYellow}>
                <Text style={style.buttonText}>Update Item</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
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
