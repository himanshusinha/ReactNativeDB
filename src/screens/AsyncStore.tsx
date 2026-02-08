import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const AsyncStoreScreen = () => {
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name', 'Himanshu');
      console.log('Data saved successfully!');
    } catch (e) {
      console.log('Error saving data', e);
    }
  };

  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      console.log(name);
    } catch (error) {}
  };

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('name');
      console.log('Data removed successfully!');
    } catch (error) {}
  };
  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('name');
      console.log('Data removed successfully!');
    } catch (error) {}
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <TextInput
        value={input}
        onChangeText={setInput}
        style={styles.input}
        placeholder="Enter value"
      /> */}

      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.title}>Save Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={getData}>
        <Text style={styles.title}>Get Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={deleteData}>
        <Text style={styles.title}>Delete Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={clearData}>
        <Text style={styles.title}>Clear All Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
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

export default AsyncStoreScreen;
