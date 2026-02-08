import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storage } from '../storage/storage';
import Button from '../components/Button/Button';
import { User } from '../types';
import CustomTextInput from '../components/TextInput/TextInput';

const STORAGE_KEY = 'users';

const MmkvScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);
  
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const data = storage.getString(STORAGE_KEY);
    if (data) {
      setUsers(JSON.parse(data));
    }
  };

  const saveUser = () => {
    if (!name.trim() || !age.trim()) return;

    const newUser: User = {
      id: Date.now().toString(),
      name,
      age,
    };

    const updated = [...users, newUser];
    setUsers(updated);
    storage.set(STORAGE_KEY, JSON.stringify(updated));
    setName('');
    setAge('');
  };

  const deleteUser = (id: string) => {
    const updated = users.filter(item => item.id !== id);
    setUsers(updated);
    storage.set(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 15 }}>MMKV User List</Text>

      <CustomTextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10 }}
      />

      <CustomTextInput
        placeholder="Enter age"
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
        style={{ marginBottom: 10 }}
      />

      <Button
        title="ADD USER"
        onPress={saveUser}
        backgroundColor="#000"
        width="100%"
      />

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              borderWidth: 1,
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {item.name} ({item.age})
            </Text>

            <TouchableOpacity onPress={() => deleteUser(item.id)}>
              <Text style={{ color: 'red', fontWeight: '600' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MmkvScreen;
