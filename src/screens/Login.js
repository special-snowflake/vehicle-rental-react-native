import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  // KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../commons/styles/Auth';
import {connect, useDispatch} from 'react-redux';
import {loginAction} from '../redux/actions/auth';
import {customToast} from '../modules/helpers/toast';
import {useIsFocused} from '@react-navigation/native';

const Login = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const handleLogin = () => {
    const body = {
      user: email,
      password,
    };
    dispatch(loginAction(body));
    console.log(body);
  };

  useEffect(() => {
    if (props.auth.isFulfilled === true) {
      setIsFetching(true);
      navigation.navigate('StackTab');
      console.log('login success');
      customToast(ToastAndroid, 'Login Success');
    }
    if (props.auth.isRejected === true) {
      setIsFetching(false);
      console.log('login failed');
      customToast(ToastAndroid, 'Login Failed');
    }
    if (props.auth.isPending === true) {
      setIsFetching(true);
    }
  }, [props.auth, navigation, isFocused]);

  return (
    <ScrollView>
      <ImageBackground
        source={require('../commons/assets/images/background-login.jpg')}
        style={styles.background}>
        <View style={styles.main}>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>LET'S EXPLORE</Text>
            <Text style={styles.header}>THE WORLD</Text>
          </View>
          <View style={styles.inputWrapper}>
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
            <Text style={styles.forget}>Forget Password?</Text>
            <TouchableOpacity
              style={styles.btnYellow}
              onPress={() => {
                if (!isFetching) {
                  handleLogin();
                }
              }}>
              {!isFetching ? (
                <Text style={styles.btnText}>Login</Text>
              ) : (
                <View style={styles.indicatorWrapper}>
                  <ActivityIndicator size="small" color="#393939" />
                </View>
              )}
            </TouchableOpacity>
            <View>
              <Text style={styles.signupWrapper}>
                Don’t have account?
                <Text
                  style={styles.signup}
                  onPress={() => {
                    navigation.navigate('SignUpAuth');
                  }}>
                  Sign up now
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
