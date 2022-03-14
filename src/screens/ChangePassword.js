import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../commons/styles/ChangePassword';
import {customToast} from '../modules/helpers/toast';
import {changePassword} from '../modules/utils/user';
import {useSelector} from 'react-redux';
const ChangePassword = () => {
  const user = useSelector(state => state.auth.userData);
  const [showPassword, setShowPassword] = useState([false, false, false]);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const changeShowPassword = idx => {
    let items = [...showPassword];
    let item = showPassword[idx];
    item = !showPassword[idx];
    items[idx] = item;
    setShowPassword(items);
  };
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.label}>Current Password:</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Enter Your Current Password"
          secureTextEntry={!showPassword[0]}
          onChange={text => {
            setCurrentPassword(text.nativeEvent.text);
          }}
          style={styles.inputPassword}
        />
        <TouchableOpacity
          style={styles.showPassword}
          onPress={() => {
            changeShowPassword(0);
          }}>
          <Text style={styles.txtShowPassword}>
            {showPassword[0] === true ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>New Password:</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Enter Your New Password"
          secureTextEntry={!showPassword[1]}
          onChange={text => {
            setNewPassword(text.nativeEvent.text);
          }}
          style={styles.inputPassword}
        />
        <TouchableOpacity
          style={styles.showPassword}
          onPress={() => {
            changeShowPassword(1);
          }}>
          <Text style={styles.txtShowPassword}>
            {showPassword[1] === true ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Repeat New Password:</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Repeat Your New Password"
          secureTextEntry={!showPassword[2]}
          onChange={text => {
            setRepeatPassword(text.nativeEvent.text);
          }}
          style={styles.inputPassword}
        />
        <TouchableOpacity
          style={styles.showPassword}
          onPress={() => {
            changeShowPassword(2);
          }}>
          <Text style={styles.txtShowPassword}>
            {showPassword[2] === true ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonYellow}
        onPress={() => {
          if (
            !currentPassword ||
            currentPassword === '' ||
            !newPassword ||
            newPassword === '' ||
            !repeatPassword ||
            repeatPassword === ''
          ) {
            customToast(ToastAndroid, 'Please Fill All Field');
          } else {
            if (newPassword !== repeatPassword) {
              customToast(
                ToastAndroid,
                'The Password You Entered Do Not Match',
              );
            } else {
              const body = {oldPassword: currentPassword, newPassword};
              console.log('body', body);
              setIsFetching(true);
              changePassword(body, user.token)
                .then(res => {
                  setIsFetching(false);
                  customToast(ToastAndroid, res.data.msg);
                  console.log(res);
                })
                .catch(err => {
                  setIsFetching(false);
                  console.log(err.response);
                  const msg =
                    err.response.data.errMsg || 'Change Password Failed';
                  customToast(ToastAndroid, msg);
                });
            }
          }
        }}>
        {!isFetching ? (
          <Text style={styles.textButtonYellow}>Save Password</Text>
        ) : (
          <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="small" color="#393939" />
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangePassword;
