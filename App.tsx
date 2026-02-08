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

  const saveData = async () => {
    try {
      const data = await AsyncStorage.setItem('data', input);
      setSavedData(JSON.stringify(data));
    } catch (e) {
      console.log('Error saving data', e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        setSavedData(value);
      }
    } catch (e) {
      console.log('Error getting data', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        onChangeText={setInput}
        style={styles.input}
        placeholder="Enter value"
      />

      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.title}>Save Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={getData}>
        <Text style={styles.title}>Get Data</Text>
      </TouchableOpacity>

      <Text style={styles.titleInfo}>Stored Data : {savedData}</Text>
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
