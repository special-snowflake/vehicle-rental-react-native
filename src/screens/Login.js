import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../commons/styles/Auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useDispatch} from 'react-redux';
import {loginAction} from '../redux/actions/auth';
import {} from 'react-native-toast-message';

const Login = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigation = props.navigation;
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
      // Toast.show({
      //   type: 'success',
      //   text1: 'Login Success 👋',
      // });
      // return navigate('/', {replace: true});
      navigation.navigate('StackTab');
      console.log('login success');
    }
    if (props.auth.isRejected === true) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Login Failed 😥',
      // });
      console.log('login failed');
    }
  }, [props.auth, navigation]);

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
            <TextInput
              style={styles.inputForm}
              placeholder="Password"
              secureTextEntry={true}
              onChange={text => {
                setPassword(text.nativeEvent.text);
              }}
            />
            <Text style={styles.forget}>Forget Password?</Text>
            <TouchableOpacity style={styles.btnYellow} onPress={handleLogin}>
              <Text style={styles.btnText}>Login</Text>
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
            <View style={{marginVertical: 30}}>
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
