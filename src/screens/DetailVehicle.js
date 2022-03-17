import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from '../commons/styles/DetailVehicle';
import {getVehicleDetail} from '../modules/utils/vehicles';
import {grabLocalYMD, numberToRupiah} from '../modules/helpers/collection';
import {useSelector} from 'react-redux';
const defaultCar = require('../commons/assets/images/car-default.jpg');

import DateTimePicker from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import {customToast} from '../modules/helpers/toast';
import {useIsFocused} from '@react-navigation/native';
import {addFavourtie} from '../modules/utils/favourite';

const imagehost = process.env.URL_API + '/vehicles';

const DetailVehicle = ({navigation, route}) => {
  console.log('route:', route);
  console.log(route.params);
  const [dataVehicle, setDataVehicle] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const isFocused = useIsFocused();
  const [formatDate, setFormatDate] = useState(null);
  const [day, setDay] = useState(1);
  const [image, setImage] = useState(defaultCar);
  const [counter, setCounter] = useState(1);
  const user = useSelector(state => state.auth.userData);

  const today = new Date();
  console.log('today', today);
  const handleDatePicker = value => {
    setShowDate(false);
    console.log('A date has been picked: ', value);
    setSelectedDate(value);
    setFormatDate(grabLocalYMD(value));
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

  const handleAddFav = () => {
    const body = {
      vehicle_id: dataVehicle.id,
    };
    console.log('dataveh', dataVehicle, body);
    addFavourtie(body, user.token)
      .then(res => {
        console.log('add fav', res);
        customToast(ToastAndroid, 'Vehicle add to favourite');
      })
      .catch(err => {
        console.log(err);
        customToast(ToastAndroid, 'Failed to add vehicle to favourite');
      });
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
  }, [route, isFocused]);
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
            {user.token && user.token !== '' ? (
              <TouchableOpacity
                style={style.favButton}
                onPress={() => {
                  handleAddFav();
                }}>
                <Text>♥</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
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
                style={style.w30}>
                <Image
                  source={require('../commons/assets/icons/chat.png')}
                  style={style.wh30}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.contentWrapper}>
            <Text style={style.description}>{dataVehicle.description}</Text>
            <Text style={style.textGreen}>{dataVehicle.status}</Text>
          </View>
          <View style={style.contentIcon}>
            <View style={style.contentIconLeft}>
              <Image
                source={require('../commons/assets/icons/pin.png')}
                style={style.iconImg}
              />
            </View>
            <View style={style.contentIconRight}>
              <Text style={style.textIcon}>{dataVehicle.city}, Indonesia</Text>
            </View>
          </View>
          <View style={style.contentIcon}>
            <View style={style.contentIconLeft}>
              <Image
                source={require('../commons/assets/icons/distance.png')}
                style={style.iconImg}
              />
            </View>
            <View style={style.contentIconRight}>
              <Text style={style.textIcon}>3.7 KM from your location </Text>
            </View>
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
              <Text style={style.loginSuggestion}>
                You need to login to make a reservation
              </Text>
              <View style={style.pmt30}>
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
                    {formatDate || 'Select Date'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.pickerRight}>
                  <Picker
                    onValueChange={val => {
                      console.log(val);
                      setDay(val);
                    }}
                    selectedValue={day}>
                    <Picker.Item label="1 Day" value={1} />
                    <Picker.Item label="2 Days" value={2} />
                    <Picker.Item label="3 Days" value={3} />
                    <Picker.Item label="4 Days" value={4} />
                    <Picker.Item label="5 Days" value={5} />
                    <Picker.Item label="6 Days" value={6} />
                    <Picker.Item label="7 Days" value={7} />
                  </Picker>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={showDate}
                  mode={'date'}
                  date={selectedDate || new Date()}
                  minimumDate={today}
                  onConfirm={handleDatePicker}
                  onCancel={() => setShowDate(false)}
                />
              </View>
              <View style={{padding: 10, marginTop: 20, marginBottom: 80}}>
                <TouchableOpacity
                  style={style.buttonYellow}
                  onPress={() => {
                    if (selectedDate) {
                      let param = {
                        counter,
                        day,
                        startDate: String(selectedDate),
                        dataVehicle,
                      };
                      let endDate = selectedDate;
                      endDate.setDate(endDate.getDate() + day);
                      param = {...param, endDate: String(endDate)};
                      console.log(param);
                      navigation.navigate('Transaction1', param);
                    } else {
                      customToast(
                        ToastAndroid,
                        'Please Select Date and Day to Continue',
                      );
                    }
                  }}>
                  <Text style={style.buttonText}>Reservation</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <></>
          )}
          {user.id && user.id === dataVehicle.user_id ? (
            <View style={style.updateItemWrapper}>
              <TouchableOpacity
                style={style.buttonYellow}
                onPress={() => {
                  navigation.navigate('UpdateVehicle', dataVehicle);
                }}>
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
