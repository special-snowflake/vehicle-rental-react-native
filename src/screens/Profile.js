import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {logoutAction} from '../redux/actions/auth';
import {logout} from '../modules/utils/auth';

import style from '../commons/styles/Profile';
import modalStyle from '../commons/styles/Modals';
import {getUserDetail} from '../modules/utils/user';
import {capitalizeFirstLetter} from '../modules/helpers/collection';
import {customToast} from '../modules/helpers/toast';
import {useIsFocused} from '@react-navigation/native';

const defaultUser = require('../commons/assets/images/defaultSmall.jpg');
const imagehost = process.env.URL_API + '/user';

const Profile = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(defaultUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log(user);
    console.log('token', user.token);
    console.log('logout');
    customToast(ToastAndroid, 'Logout Success');
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
        console.log(err);
        console.log(err.response);
      });
  };
  useEffect(() => {
    if (user.token && user.token !== '') {
      getUserInfo();
    }
  }, [user]);
  useEffect(() => {
    if (user.token && user.token !== '') {
      getUserInfo();
    }
  }, [isFocused]);
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
                  <Text style={style.fs16}>
                    {capitalizeFirstLetter(user.roles)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={style.menuWrapper}
                onPress={() => {
                  navigation.navigate('Favourite');
                }}>
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
              </TouchableOpacity>
              <TouchableOpacity
                style={style.menuWrapper}
                onPress={() => {
                  navigation.navigate('SplashScreen');
                }}>
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
              </TouchableOpacity>
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
                  navigation.navigate('ChangePassword');
                }}>
                <View style={style.menuWrapper}>
                  <View style={style.menuText}>
                    <Text style={style.menuTextContent}>Update Password</Text>
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
                  setShowModal(true);
                }}
                style={style.buttonSpacing}>
                <View style={style.buttonLogout}>
                  <Text style={style.buttonText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <View style={style.marginLoading}>
              <ActivityIndicator size="large" color="#FFCD61" />
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
                style={style.buttonSpacing}>
                <View style={style.buttonLogout}>
                  <Text style={style.buttonText}>Logout</Text>
                </View>
              </TouchableOpacity>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setShowModal(false);
        }}>
        <TouchableOpacity
          onPress={() => {
            setShowModal(false);
          }}
          style={modalStyle.modalTouchableLayout}>
          <View style={modalStyle.modalCoverMiddle}>
            <View style={modalStyle.modalContentMiddle}>
              <Text style={modalStyle.textMiddleHeader}>
                Are You Sure You Want To Logout?
              </Text>
              <View style={modalStyle.buttonMiddleWrapper}>
                <TouchableOpacity
                  style={modalStyle.btnYellowSm}
                  onPress={() => {
                    setShowModal(false);
                    console.log('log me out');
                    handleLogout();
                  }}>
                  <Text style={modalStyle.textBtnYellow}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={modalStyle.buttonPrimarySm}
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <Text style={modalStyle.textBtnPrimary}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default Profile;
