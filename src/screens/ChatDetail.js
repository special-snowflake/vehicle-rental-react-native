import {View, ScrollView, Text, Image} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';

const ChatDetail = ({navigation}) => {
  return (
    <ScrollView
      style={{
        backgroundColor: '#FFFF',
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '50%',
          padding: 20,
          marginTop: 20,
        }}>
        <Text
          style={{
            color: '#393939',
            fontSize: 28,
            fontWeight: 'bold',
          }}>
          Honda Jazz
        </Text>
      </View>

      <View
        style={{
          padding: 20,
        }}>
        <View
          style={{
            marginBottom: 50,
            borderColor: 'grey',
            borderRadius: 10,
            flexDirection: 'row',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
          <View
            style={{
              width: 200,
              // borderWidth: 1,
              height: 130,
              borderRadius: 10,
            }}>
            <Image
              source={require('../commons/assets/images/car-default.jpg')}
              style={{
                width: undefined,
                height: undefined,
                resizeMode: 'cover',
                flex: 1,
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              padding: 10,
              paddingStart: 20,
              flex: 1,
              height: 130,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '700',
              }}>
              Honda Jazz
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'green',
                fontWeight: '700',
              }}>
              Available
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: '700',
              }}>
              Rp. 320.000/day
            </Text>
            <View
              style={{
                alignItems: 'flex-end',
              }}></View>
          </View>
        </View>

        <View style={{alignItems: 'flex-end', marginBottom: 20}}>
          <View
            style={{
              backgroundColor: '#393939',
              width: '70%',
              padding: 20,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppoins-Regular',
                fontWeight: '400',
                color: '#fff',
                lineHeight: 18,
                textAlign: 'right',
              }}>
              Hey, is this car ready for rent?
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              width: '70%',
              padding: 10,
            }}>
            <Text
              style={{
                fontWeight: '400',
                lineHeight: 15,
                color: '#9F9F9F',
              }}>
              Read [15.04 PM]
            </Text>
          </View>
        </View>

        <View style={{alignItems: 'flex-start', marginBottom: 20}}>
          <View
            style={{
              backgroundColor: '#FFCD61',
              width: '70%',
              padding: 20,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontWeight: '400',
                color: '#4E4E4E',
                lineHeight: 18,
              }}>
              Yes it is, you may make a reservation now
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              width: '70%',
              padding: 10,
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                lineHeight: 15,
                color: '#9F9F9F',
              }}>
              16.10 PM
            </Text>
          </View>
        </View>

        <View
          style={{
            // borderWidth: 1,
            marginTop: 90,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 30,
                backgroundColor: '#dadada6e',
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#393939',
                }}>
                Okay.
              </Text>
            </View>

            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 30,
                backgroundColor: '#dadada6e',
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#393939',
                }}>
                Thank you!
              </Text>
            </View>

            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 30,
                backgroundColor: '#dadada6e',
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#393939',
                }}>
                You're very helpful.
              </Text>
            </View>
          </View>
          <View
            style={{
              // borderWidth: 1,
              padding: 5,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: '#DFDEDE',
            }}>
            <TextInput
              placeholder="Type a message"
              placeholderTextColor="#000"
              style={{
                width: '85%',
                // borderWidth: 1,
                paddingStart: 20,
                color: '#000',
                fontWeight: '400',
                lineHeight: 22,
                fontSize: 16,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}></View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChatDetail;
