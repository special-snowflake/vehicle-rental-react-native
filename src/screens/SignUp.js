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
import {register} from '../modules/utils/auth';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  // const navigation = props.navigation;
  const handleSignup = () => {
    const body = {
      email,
      name,
      password,
    };
    console.log(body);
    register(body)
      .then(res => {
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);
      });
  };

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
            <TextInput
              style={styles.inputForm}
              placeholder="Password"
              secureTextEntry={true}
              onChange={text => {
                setPassword(text.nativeEvent.text);
              }}
            />
            {/* <Text style={styles.forget}>Forget Password?</Text> */}
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
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default SignUp;
