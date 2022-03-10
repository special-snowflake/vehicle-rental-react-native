import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

import {logoutAction} from '../redux/actions/auth';
import {logout} from '../modules/utils/auth';

import style from '../commons/styles/Profile';
import {getUserDetail} from '../modules/utils/user';
import {capitalizeFirstLetter} from '../modules/helpers/collection';

const defaultUser = require('../commons/assets/images/defaultSmall.jpg');
const imagehost = process.env.URL_API + '/user';

const Profile = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(defaultUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log(user);
    console.log('token', user.token);
    console.log('logout');
    logout(user.token);
    dispatch(logoutAction());
    navigation.replace('Login');
  };
  const getUserInfo = () => {
    const id = user.id;
    getUserDetail(id)
      .then(res => {
        console.log(res);
        setUserInfo(res.data.data);
        const newImage = imagehost + res.data.data.photo;
        console.log('new image', newImage);
        setImage({uri: newImage});
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      {user && user.token && user.token !== '' ? (
        <ScrollView style={style.viewScroll}>
          {userInfo !== null ? (
            <>
              <View style={style.profileHeader}>
                <View style={style.imageWrapper}>
                  <Image
                    source={image}
                    onError={({currentTarget}) => {
                      currentTarget.onerror = null;
                      console.log(image);
                      setImage(defaultUser);
                    }}
                    style={style.userImage}
                    resizeMethod="resize"
                    resizeMode="cover"
                  />
                </View>
                <View style={style.nameWrapper}>
                  <Text style={style.name}>{userInfo.full_name}</Text>
                  <Text>{capitalizeFirstLetter(user.roles)}</Text>
                </View>
              </View>
              <View style={style.menuWrapper}>
                <View style={style.menuText}>
                  <Text style={style.menuTextContent}>Your favourite</Text>
                </View>
                <View style={style.menuImageWrapper}>
                  <Image
                    source={require('../commons/assets/icons/next.png')}
                    resizeMethod="scale"
                    resizeMode="cover"
                    style={style.menuImage}
                  />
                </View>
              </View>
              <View style={style.menuWrapper}>
                <View style={style.menuText}>
                  <Text style={style.menuTextContent}>FAQ</Text>
                </View>
                <View style={style.menuImageWrapper}>
                  <Image
                    source={require('../commons/assets/icons/next.png')}
                    resizeMethod="scale"
                    resizeMode="cover"
                    style={style.menuImage}
                  />
                </View>
              </View>
              <View style={style.menuWrapper}>
                <View style={style.menuText}>
                  <Text style={style.menuTextContent}>Help</Text>
                </View>
                <View style={style.menuImageWrapper}>
                  <Image
                    source={require('../commons/assets/icons/next.png')}
                    resizeMethod="scale"
                    resizeMode="cover"
                    style={style.menuImage}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log('goto update profile');
                  console.log(userInfo);
                  navigation.navigate('UpdateProfile', {userInfo});
                }}>
                <View style={style.menuWrapper}>
                  <View style={style.menuText}>
                    <Text style={style.menuTextContent}>Update Profile</Text>
                  </View>
                  <View style={style.menuImageWrapper}>
                    <Image
                      source={require('../commons/assets/icons/next.png')}
                      resizeMethod="scale"
                      resizeMode="cover"
                      style={style.menuImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleLogout();
                }}
                style={{padding: 15, marginTop: 150}}>
                <View style={style.buttonLogout}>
                  <Text style={style.buttonText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <View style={style.marginLoading}>
              <ActivityIndicator size="large" color="#FFCD61" />
            </View>
          )}
        </ScrollView>
      ) : (
        <>
          <ScrollView style={style.viewScroll}>
            <View style={style.headerWrapper}>
              <Text style={style.headerText}>Profile</Text>
            </View>
            <Text style={style.loginInfo}>
              You need to login to see Profile
            </Text>
            <TouchableOpacity
              style={style.buttonYellow}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={style.textButtonYellow}>Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Profile;
