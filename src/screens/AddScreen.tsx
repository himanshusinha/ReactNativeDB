import React, { FC, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import CustomTextInput from '../components/TextInput/TextInput';
import Button from '../components/Button/Button';

const AddScreen: FC = () => {
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSave = async () => {
    const oldData = await AsyncStorage.getItem('contacts');
    const oldContacts = oldData ? JSON.parse(oldData) : [];
    const updatedContacts = [...oldContacts, { name, mobile }];
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <CustomTextInput value={name} onChangeText={setName} />

      <Text style={styles.label}>Mobile</Text>
      <CustomTextInput
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
      />

      <Button title="Save Contact" onPress={handleSave} width="100%" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 15, fontWeight: 'bold' },
});

export default AddScreen;
