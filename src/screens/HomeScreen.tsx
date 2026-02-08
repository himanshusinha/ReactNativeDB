import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { FC, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button/Button';
import { Contact, RootStackParamList } from '../types';

const HomeScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getData = async () => {
    const data = await AsyncStorage.getItem('contacts');
    const contacts = data ? JSON.parse(data) : [];
    setContacts(contacts);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const deleteContact = async (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const renderItem = ({ item, index }: { item: Contact; index: number }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.mobile}>{item.mobile}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteContact(index)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  const logOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Splash');
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={[
          { padding: 20 },
          contacts.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>No contacts found</Text>
          </View>
        }
      />

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={() => logOut()} width="40%" />
        <Button
          title="Add Contact"
          onPress={() => navigation.navigate('Add')}
          width="40%"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  mobile: {
    fontSize: 14,
    marginTop: 4,
  },

  deleteBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'center',
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },

  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
