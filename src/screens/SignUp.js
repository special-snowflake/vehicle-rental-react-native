import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../commons/styles/Auth';
import {register} from '../modules/utils/auth';
import {customToast} from '../modules/helpers/toast';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const SignUp = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(null);
  const handleSignup = () => {
    const body = {
      email,
      name,
      password,
    };
    console.log(body);
    register(body)
      .then(res => {
        customToast(ToastAndroid, 'Registration Success');
        navigation.navigate('Login');
      })
      .catch(err => {
        customToast(ToastAndroid, 'Registration Failed');
        console.log(err);
      });
  };

  useEffect(() => {
    if (user.token !== '') {
      navigation.navigate('Home1');
    }
  }, [isFocused, user]);
  return (
    <ScrollView>
      <ImageBackground
        source={require('../commons/assets/images/background-signup.png')}
        style={styles.background}>
        <View style={styles.main}>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>LET'S HAVE</Text>
            <Text style={styles.header}>SOME RIDE</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputForm}
              placeholder="Name"
              onChange={text => {
                setName(text.nativeEvent.text);
              }}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Email"
              onChange={text => {
                setEmail(text.nativeEvent.text);
              }}
            />
            <View style={{...styles.inputForm, ...styles.inputPassword}}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChange={text => {
                  setPassword(text.nativeEvent.text);
                }}
              />
              <TouchableOpacity
                style={styles.showWrapper}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}>
                <Text style={styles.showButton}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnYellow} onPress={handleSignup}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.signupWrapper}>
                Already have an account?
                <Text
                  style={styles.signup}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  Login now
                </Text>
              </Text>
            </View>
            <View style={styles.mv30}>
              <Text
                style={styles.signupWrapper}
                onPress={() => {
                  navigation.navigate('StackTab');
                }}>
                Back to Home
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default SignUp;
