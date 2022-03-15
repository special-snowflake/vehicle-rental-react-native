import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
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

const UpdateProfile = ({navigation, route: {params}}) => {
  const formatDOB = params.userInfo.dob.slice(0, 10);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userInfo, setUserInfo] = useState(params.userInfo);
  const [image, setImage] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checked, setChecked] = useState(params.userInfo.sex);
  const [showDate, setShowDate] = useState(false);
  const [selectedDoB, setSelectedDoB] = useState(formatDOB);
  const user = useSelector(state => state.auth.userData);

  useEffect(() => {
    console.log('ui', userInfo);
  });
  const uploadImage = () => {
    console.log('edit image');
    const res = DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    })
      .then(response => {
        console.log(res);
        console.log(response[0]);
        const newImage = response[0].uri;
        setImage({uri: newImage});
        setSelectedImage(response[0]);
      })
      .catch(err => {
        console.log(err);
      });
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
    // const slicedDate =
    // const n = date.slice(0, 9);
    // console.log('A date : ', n);
    setSelectedDoB(newDate);
    setShowDate(false);
  };

  const handleSaveChanges = () => {
    const body = new FormData();
    console.log('selected', selectedImage);
    if (selectedImage !== null) {
      body.append('profilePicture', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
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
      .done();
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
                uploadImage();
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
          status={checked.toLowerCase() === 'f' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('F')}
        />
        <Text style={style.radioF}>Female</Text>
        <RadioButton
          value="m"
          status={checked.toLowerCase() === 'm' ? 'checked' : 'unchecked'}
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
        <Text style={style.textButton}>Save Change</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateProfile;
