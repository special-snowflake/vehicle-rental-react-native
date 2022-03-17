import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
const defaultImage = require('../commons/assets/images/defaultBig.jpg');

import style from '../commons/styles/UpdateProfile';
import {useSelector} from 'react-redux';
import {updateUsingFetch} from '../modules/utils/user';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {customToast} from '../modules/helpers/toast';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import modalStyle from '../commons/styles/Modals';

const UpdateProfile = ({navigation, route: {params}}) => {
  // const formatDOB = ;
  const [isFetching, setIsFetching] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userInfo, setUserInfo] = useState(params.userInfo);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checked, setChecked] = useState(params.userInfo.sex || null);
  const [showDate, setShowDate] = useState(false);
  const [selectedDoB, setSelectedDoB] = useState(
    params.userInfo.dob ? params.userInfo.dob.slice(0, 10) : null,
  );
  const user = useSelector(state => state.auth.userData);

  useEffect(() => {
    console.log('ui', userInfo);
  });
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
        console.log('res get image', response);
        resposeFileController(response);
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
        }
      });
    }
  };

  useEffect(() => {
    const host = process.env.URL_API + '/user';
    if (userInfo && userInfo.photo && userInfo.photo !== null) {
      console.log('photo', host.concat(userInfo.photo));
      setImage({uri: host.concat(userInfo.photo)});
    }
  }, [userInfo]);

  const handleDatePicker = date => {
    console.log('A date has been picked: ', date);
    const newDate = date.toISOString(date).slice(0, 10);
    console.log('newdate:', newDate, typeof newDate);
    setSelectedDoB(newDate);
    setShowDate(false);
  };

  const handleSaveChanges = () => {
    const body = new FormData();
    console.log('selected', selectedImage);
    if (selectedImage) {
      body.append('profilePicture', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName,
      });
    }
    if (name) {
      body.append('full_name', name);
    }
    if (phone) {
      body.append('phone', phone);
    }
    if (email) {
      body.append('phone', email);
    }
    if (checked) {
      body.append('sex', checked);
    }
    if (selectedDoB) {
      body.append('dob', selectedDoB);
    }
    console.log('body', body);
    setIsFetching(true);
    updateUsingFetch(body, user.token)
      .then(res => {
        if (res.ok) {
          console.log('success', res);
          customToast(ToastAndroid, 'Update Profile Success');
          return res.json();
        }
        return console.log('success', res);
      })
      .then(response => {
        console.log('res', response);
      })
      .catch(e => {
        customToast(
          ToastAndroid,
          'Update Profile Failed, Check Your Connection',
        );
        console.log('error', e);
      })
      .done(() => {
        setIsFetching(true);
      });
    console.log(body, user.token);
  };
  return (
    <ScrollView style={style.viewScroll}>
      <View style={style.userImageWrapper}>
        <View style={style.userImage}>
          <Image
            source={image}
            resizeMode="cover"
            resizeMethod="resize"
            onError={({currentTarget}) => {
              console.log('onError', image);
              currentTarget.onerror = null;
              setImage(defaultImage);
            }}
            style={style.userImg}
          />
          <View style={style.buttonWrapper}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}>
              <Image
                source={require('../commons/assets/icons/pencil.png')}
                resizeMode="cover"
                resizeMethod="scale"
                style={style.imgButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.radioWrapper}>
        <RadioButton
          value="f"
          status={
            checked && checked.toLowerCase() === 'f' ? 'checked' : 'unchecked'
          }
          onPress={() => setChecked('F')}
        />
        <Text style={style.radioF}>Female</Text>
        <RadioButton
          value="m"
          status={
            checked && checked.toLowerCase() === 'm' ? 'checked' : 'unchecked'
          }
          onPress={() => setChecked('M')}
        />
        <Text>Male</Text>
      </View>
      <Text>Name:</Text>
      <TextInput
        style={style.inputField}
        placeholder="Enter Your Name"
        defaultValue={userInfo.full_name}
        placeholderTextColor="#DADADA"
        onChange={text => {
          setName(text.nativeEvent.text);
        }}
      />
      <Text>Email Address:</Text>
      <TextInput
        style={style.inputField}
        placeholder="Enter Your Email Address"
        defaultValue={userInfo.email}
        placeholderTextColor="#DADADA"
        onChange={text => {
          setEmail(text.nativeEvent.text);
        }}
      />
      <Text>Phone Number:</Text>
      <TextInput
        style={style.inputField}
        defaultValue={userInfo.phone}
        placeholder="Enter Your Phone Number"
        placeholderTextColor="#DADADA"
        onChange={text => {
          setPhone(text.nativeEvent.text);
        }}
      />
      <Text>Date of Birth:</Text>
      <TouchableOpacity
        style={{...style.inputField, ...style.inputDate}}
        onPress={() => {
          setShowDate(true);
        }}>
        <Text style={style.pv5}>
          {selectedDoB ? selectedDoB : 'Select DOB'}
        </Text>
        <Image
          source={require('../commons/assets/icons/calendar.png')}
          style={style.iconCalendar}
        />
      </TouchableOpacity>
      <DateTimePicker
        isVisible={showDate}
        mode={'date'}
        // defaultValue={new Date(selectedDoB)}
        date={new Date(selectedDoB) || new Date()}
        onConfirm={handleDatePicker}
        onCancel={() => setShowDate(false)}
      />
      <TouchableOpacity
        style={style.buttonSave}
        onPress={() => {
          handleSaveChanges();
        }}>
        {!isFetching ? (
          <Text style={style.textButton}>Save Change</Text>
        ) : (
          <View style={{height: 25}}>
            <ActivityIndicator color="#393939" size="small" />{' '}
          </View>
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
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
      </Modal>
    </ScrollView>
  );
};

export default UpdateProfile;
