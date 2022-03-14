import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
const defaultImage = require('../commons/assets/images/defaultBig.jpg');

import style from '../commons/styles/UpdateProfile';
import {useSelector} from 'react-redux';
import {updateUsingFetch} from '../modules/utils/user';
import DateTimePicker from 'react-native-modal-datetime-picker';

const UpdateProfile = ({navigation, route: {params}}) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userInfo, setUserInfo] = useState(params.userInfo);
  const [image, setImage] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checked, setChecked] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [selectedDoB, setSelectedDoB] = useState(false);
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
    const n = date.slice(0, 9);
    console.log('A date : ', n);
    // setSelectedDoB(date.slice(0,));
    setShowDate(false);
  };

  const handleSaveChanges = () => {
    const body = new FormData();
    // console.log(selectedImage.uri);
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
    body.append('sex', 'M');
    if (phone) {
      body.append('phone', phone);
    }
    if (email) {
      body.append('phone', email);
    }
    console.log('body', body);
    updateUsingFetch(body, user.token)
      .then(res => {
        return console.log('success', res);
      })
      .catch(e => console.log('error', e))
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
          status={userInfo.sex.toLowerCase() === 'f' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('f')}
        />
        <Text style={style.radioF}>Female</Text>
        <RadioButton
          value="m"
          status={userInfo.sex.toLowerCase() === 'm' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('m')}
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
        style={style.inputField}
        onPress={() => {
          setShowDate(true);
        }}>
        <Text style={{paddingVertical: 5}}>
          {userInfo.dob ? userInfo.dob.slice(0, 10) : 'Select DOB'}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={showDate}
        mode={'date'}
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
      {/* <TouchableOpacity
        style={style.buttonBlack}
        onPress={() => {
          // handleSaveChanges();
        }}>
        <Text style={style.textButtonBlack}>Change Password</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default UpdateProfile;
