import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from '../commons/styles/Chat';
import {Button} from 'react-native-paper';
const Chat = ({navigation}) => {
  return (
    <>
      <ScrollView style={{backgroundColor: 'white', paddingHorizontal: 15}}>
        <TextInput
          style={{
            padding: 15,
            marginHorizontal: 10,
            backgroundColor: '#ededed',
            borderRadius: 10,
            marginBottom: 20,
          }}
          placeholder="Search Chat"
        />
        <View>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              borderBottomColor: '#ededed',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>User 1</Text>
              <Text style={{fontSize: 15}}>Just now</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Hey, there are 3 vespa left
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: '#FFCD61',
                }}>
                <Text>9+</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              borderBottomColor: '#ededed',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>User 2</Text>
              <Text style={{fontSize: 15}}>Yesterdey</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 15}}>Hey, there are 2 vespa left</Text>
              {/* <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: 'yellow',
                }}>
                <Text>9+</Text>
              </View> */}
            </View>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', marginTop: 50, fontSize: 15}}>
            You have no conversation left
          </Text>
          <Button
            onPress={() => {
              navigation.navigate('Transaction1');
            }}>
            Transaction 1
          </Button>
          <Button>Transaction 2</Button>
          <Button>Transaction 3</Button>
        </View>
      </ScrollView>
    </>
  );
};

export default Chat;
