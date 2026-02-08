import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [savedData, setSavedData] = useState<string>('');
  const USER_1 = {
    name: 'Tom',
    age: 20,
    traits: {
      hair: 'black',
      eyes: 'blue',
    },
  };

  const USER_2 = {
    name: 'Sarah',
    age: 21,
    hobby: 'cars',
    traits: {
      eyes: 'green',
    },
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(USER_1));
      await AsyncStorage.mergeItem('data', JSON.stringify(USER_2));
      const currentUser = await AsyncStorage.getItem('data');

      setSavedData(input);
      if (currentUser !== null) {
        const parseValue = JSON.parse(currentUser); 
        console.log('Merged Data:', parseValue);
      }
    } catch (e) {
      console.log('Error saving data', e);
    }
  };

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('data');
  //     if (value !== null) {
  //       const parsedValue: string = JSON.parse(value);
  //       setGetSavedData(parsedValue);
  //     }
  //   } catch (e) {
  //     console.log('Error getting data', e);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* <TextInput
        value={input}
        onChangeText={setInput}
        style={styles.input}
        placeholder="Enter value"
      /> */}

      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.title}>Save Data</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={getData}>
        <Text style={styles.title}>Get Data</Text>
      </TouchableOpacity>

      <Text style={styles.titleInfo}>Save Data : {savedData}</Text>

      <Text style={styles.titleInfo}>Get Data : {getSavedData}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    width: '60%',
    backgroundColor: 'green',
    marginBottom: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleInfo: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
