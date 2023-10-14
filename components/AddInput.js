import React, { useState } from "react";
import {View, TextInput, Text, TouchableOpacity} from 'react-native'


export default function AddInput() {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  return (
    <View>
      <View>
        <TextInput placeholder="Add Task..." onChangeText= 
         {onChangeText} />
      </View>
      <TouchableOpacity
        onPress={() => {
          alert('button clicked')
        }}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}