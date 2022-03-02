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
import {useSelector} from 'react-redux';
const defaultCar = require('../commons/assets/images/car-default.jpg');

import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';

const imagehost = process.env.URL_API + '/vehicles';

const DetailVehicle = ({navigation, route}) => {
  const [dataVehicle, setDataVehicle] = useState(null);
  const [image, setImage] = useState(defaultCar);
  const [counter, setCounter] = useState(1);
  const user = useSelector(state => state.auth.userData);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const day = [1, 2, 3, 4, 5, 6, 7];

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
                // style={{position: 'absolute', left: 'auto', right: 20}}
              >
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
          {user.roles !== 'owner' || !user.roles ? (
            <>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  // alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    padding: 12,
                    marginHorizontal: 10,
                    backgroundColor: 'rgba(57, 57, 57, 0.3)',
                    borderRadius: 7,
                    width: 200,
                  }}
                  onPress={() => {
                    setOpen(true);
                  }}>
                  <Text style={{textAlign: 'center'}}>Select Date</Text>
                </TouchableOpacity>
                <SelectDropdown
                  data={day}
                  buttonStyle={{
                    padding: 12,
                    marginHorizontal: 10,
                    backgroundColor: 'rgba(57, 57, 57, 0.3)',
                    borderRadius: 7,
                    width: 140,
                  }}
                  buttonTextStyle={{fontSize: 15}}
                  defaultButtonText={'Select'}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
                {/* <ModalDropdown options={['option 1', 'option 2']} /> */}
                {/* <TouchableOpacity
                  style={{
                    padding: 12,
                    borderRadius: 7,
                    marginHorizontal: 10,
                    backgroundColor: 'rgba(57, 57, 57, 0.3)',
                    width: 140,
                  }}>
                  <Text style={{textAlign: 'center'}}>Select</Text>
                </TouchableOpacity> */}
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
              <View style={{padding: 10, marginTop: 20}}>
                <TouchableOpacity style={style.buttonYellow}>
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
