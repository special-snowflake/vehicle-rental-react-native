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
import {updateUser} from '../modules/utils/user';
import DateTimePicker from 'react-native-modal-datetime-picker';

const UpdateProfile = ({navigation, route: {params}}) => {
  const [userInfo, setUserInfo] = useState(params.userInfo);
  const [image, setImage] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checked, setChecked] = useState(null);
  const [showDate, setShowDate] = useState(false);

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

  const handleDatePicker = date => {
    console.log('A date has been picked: ', date);
    setShowDate(false);
  };

  const handleSaveChanges = () => {
    const body = new FormData();
    const imagetmp = selectedImage['uri'];
    const newUri = imagetmp.slice(10);
    console.log(selectedImage.uri);
    body.append('profilePicture', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.name,
    });
    // body.append('sex', 'M');
    // body.append('gender', 'M');
    body.append('full_name', 'Uchiha Haspi');
    console.log(body, user.token);
    updateUser(body, user.token)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  return (
    <ScrollView style={style.viewScroll}>
      <View style={style.userImageWrapper}>
        <View style={style.userImage}>
          <Image
            source={image}
            resizeMode="cover"
            resizeMethod="resize"
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
          status={checked === 'f' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('f')}
        />
        <Text style={style.radioF}>Female</Text>
        <RadioButton
          value="m"
          status={checked === 'm' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('m')}
        />
        <Text>Male</Text>
      </View>
      <Text>Name:</Text>
      <TextInput
        style={style.inputField}
        placeholder="Enter Your Name"
        placeholderTextColor="#DADADA"
      />
      <Text>Email Address:</Text>
      <TextInput
        style={style.inputField}
        placeholder="Enter Your Email Address"
        placeholderTextColor="#DADADA"
      />
      <Text>Phone Number:</Text>
      <TextInput
        style={style.inputField}
        placeholder="Enter Your Phone Number"
        placeholderTextColor="#DADADA"
      />
      <Text>Date of Birth:</Text>
      <TouchableOpacity
        style={style.inputField}
        onPress={() => {
          setShowDate(true);
        }}>
        <Text style={{paddingVertical: 5}}>Something</Text>
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
      <TouchableOpacity
        style={style.buttonBlack}
        onPress={() => {
          // handleSaveChanges();
        }}>
        <Text style={style.textButtonBlack}>Change Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateProfile;
