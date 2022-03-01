import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import NativeUploady, {UploadyContext} from '@rpldy/native-uploady';
const defaultImage = require('../commons/assets/images/defaultBig.jpg');
// import NativeUploady, {
//   UploadyContext,
//   useItemFinishListener,
//   useItemStartListener,
//   useItemErrorListener,
// } from '@rpldy/native-uploady';

import style from '../commons/styles/UpdateProfile';
import {useSelector} from 'react-redux';
import {updateUser} from '../modules/utils/user';

const UpdateProfile = () => {
  const [image, setImage] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checked, setChecked] = useState(null);
  const user = useSelector(state => state.auth.userData);
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
