import {View, ScrollView, Text} from 'react-native';
import React from 'react';

const ChatDetail = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: '#FFFF',
        paddingHorizontal: 20,
        paddingVertical: 30,
        maxHeight: '100%',
      }}>
      <ScrollView style={{height: '80%'}}>
        <View style={{position: 'relative', height: 600}}>
          <View
            style={{
              backgroundColor: '#393939',
              borderRadius: 8,
              position: 'absolute',
              padding: 10,
              left: 'auto',
              minHeight: 50,
              right: 0,
            }}>
            <Text style={{fontSize: 16, color: '#FFFF'}}>
              Hei wazzzzaaaaaaa 😝
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default ChatDetail;
