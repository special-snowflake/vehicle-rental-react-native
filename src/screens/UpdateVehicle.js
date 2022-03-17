import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import style from '../commons/styles/DetailVehicle';
import modalStyle from '../commons/styles/Modals';
import {updateVehicleFetch} from '../modules/utils/vehicles';
import {useSelector} from 'react-redux';
const defaultCar = require('../commons/assets/images/car-default.jpg');

import {customToast} from '../modules/helpers/toast';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const imagehost = process.env.URL_API + '/vehicles';

const DetailVehicle = ({navigation, route}) => {
  console.log('rute:', route);
  const user = useSelector(state => state.auth.userData);
  const [name, setName] = useState(route.params.name);
  const [price, setPrice] = useState(route.params.price);
  // const [dataVehicle, setDataVehicle] = useState(route.params);
  const [status, setStatus] = useState(route.params.status);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const img = {uri: imagehost + route.params.images[0]};
  const [image, setImage] = useState(img);
  const [counter, setCounter] = useState(parseInt(route.params.stock));

  const options = {
    storageOptions: {
      path: 'images',
      mediaType: 'photo',
    },
    includeBase64: false,
  };

  const resposeFileController = response => {
    const size = response.assets[0].fileSize;
    const type = response.assets[0].type;
    if (size < 2 * 1024 * 1024) {
      if (
        type === 'image/png' ||
        type === 'image/jpg' ||
        type === 'image/jpeg'
      ) {
        setSelectedImage(response.assets[0]);
        const source = {uri: response.assets[0].uri};
        setImage(source);
      } else {
        customToast(ToastAndroid, 'Invalid image format');
      }
    } else {
      customToast(ToastAndroid, 'File is too large');
    }
  };

  const openImageLibrary = () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        resposeFileController(response);
        // setSelectedImage(response.assets[0]);
        // const source = {uri: response.assets[0].uri};
        // setImage(source);
      }
    });
  };
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('permission camera:', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      launchCamera(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          resposeFileController(response);
          // setSelectedImage(response.assets[0]);
          // const source = {uri: response.assets[0].uri};
          // setImage(source);
        }
      });
    }
  };
  const handleCounter = val => {
    if (val === 'add') {
      const newCounter = counter + 1;
      setCounter(newCounter);
    }
    if (val === 'sub') {
      if (counter > 1) {
        const newCounter = counter - 1;
        setCounter(newCounter);
      }
    }
  };

  const handleSaveChange = () => {
    setIsFetching(true);
    const body = new FormData();
    if (selectedImage) {
      body.append('images', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName,
      });
    }
    body.append('name', name);
    body.append('price', price);
    body.append('stock', counter);
    body.append('status', status);
    updateVehicleFetch(route.params.id, body, user.token)
      .then(res => {
        setIsFetching(false);
        console.log('success', res);
        if (res.ok) {
          customToast(ToastAndroid, 'Vehicle Updated');
          return res.json();
        }
      })
      .then(response => {
        console.log('hasil akhir', response);
        navigation.navigate('DetailVehicle', route.params.id);
      })
      .catch(e => {
        customToast(ToastAndroid, 'Failed to Update Vehicle');
        setIsFetching(false);
        console.log('error', e);
      })
      .done();
    console.log(body);
  };

  return (
    <ScrollView style={style.container}>
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
        <View
          style={{
            ...style.backButton,
            ...style.editButton,
          }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.goBack();
              setShowModal(true);
            }}>
            <Image
              source={require('../commons/assets/icons/pencil.png')}
              resizeMode="contain"
              style={style.iconEdit}
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
        <TextInput
          placeholder="Enter Name"
          style={style.inputField}
          defaultValue={name}
          onChange={text => {
            setName(text.nativeEvent.text);
          }}
        />
        <TextInput
          placeholder="Price"
          keyboardType="number-pad"
          style={style.inputField}
          defaultValue={price}
          onChange={text => {
            setPrice(text.nativeEvent.text);
          }}
        />
      </View>
      <View style={style.contentWrapper}>
        <Text style={style.description}>{route.params.description || '-'}</Text>
        <Text style={style.textGreen}>{status}</Text>
      </View>
      <View style={style.headerWrapper}>
        <View style={style.itemLeft}>
          <Text style={style.textSelect}>Stock :</Text>
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
      <View style={style.statusWrapper}>
        <TouchableOpacity
          style={
            status === 'Available'
              ? style.btnBlackActive
              : style.btnGreyNonActive
          }
          onPress={() => {
            setStatus('Available');
          }}>
          <Text
            style={
              status === 'Available'
                ? style.textBtnBlackActive
                : style.textGreyNonActive
            }>
            Available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            status === 'Full Booked'
              ? style.btnBlackActive
              : style.btnGreyNonActive
          }
          onPress={() => {
            setStatus('Full Booked');
          }}>
          <Text
            style={
              status === 'Full Booked'
                ? style.textBtnBlackActive
                : style.textGreyNonActive
            }>
            Full Booked
          </Text>
        </TouchableOpacity>
      </View>

      <View style={style.updateItemWrapper}>
        <TouchableOpacity
          style={style.buttonYellow}
          onPress={() => {
            if (
              name !== null &&
              name !== '' &&
              status !== null &&
              status !== '' &&
              price !== null &&
              price !== ''
            ) {
              handleSaveChange();
            } else {
              customToast(ToastAndroid, 'Please Fill All Field');
            }
          }}>
          {!isFetching ? (
            <Text style={style.buttonText}>Update Changes</Text>
          ) : (
            <View style={style.indicatorHeight}>
              <ActivityIndicator size="small" color="#393939" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setShowModal(false);
        }}>
        <TouchableOpacity
          style={modalStyle.modalTouchableLayout}
          onPress={() => {
            setShowModal(false);
          }}>
          <View style={modalStyle.modalCoverBottom}>
            <View style={modalStyle.modalContentBottom}>
              <View style={modalStyle.buttonWrapper}>
                <TouchableOpacity
                  style={modalStyle.buttonPrimary}
                  onPress={() => {
                    openCamera();
                    setShowModal(false);
                  }}>
                  <Text style={modalStyle.textBtnPrimary}>Use Camera</Text>
                </TouchableOpacity>
              </View>
              <View style={modalStyle.buttonWrapper}>
                <TouchableOpacity
                  style={modalStyle.buttonPrimary}
                  onPress={() => {
                    openImageLibrary();
                    setShowModal(false);
                  }}>
                  <Text style={modalStyle.textBtnPrimary}>
                    Choose From Gallery
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={modalStyle.buttonWrapper}>
                <TouchableOpacity
                  style={modalStyle.buttonSecondary}
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <Text style={modalStyle.textBtnSecondary}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default DetailVehicle;
