import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../app';

type AddTaskScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Add Task'
>;

type Props = {
  navigation: AddTaskScreenNavigationProp;
  route: RouteProp<any, any>; // Optional if you need route params
};

const AddTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Use platform-specific API URL (10.0.2.2 for Android emulator)
  const API_BASE_URL = Platform.OS === 'android' ? 'http://192.168.1.36:3000/api/todos' : 'http://localhost:3000/api/todos';

  const handleAddTask = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
  
      console.log('Status:', response.status);
      const text = await response.text();
      console.log('Response text:', text);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }
  
      const data = JSON.parse(text); // or response.json() if you expect JSON
      Alert.alert('Task Added', `Title: ${title}\nDescription: ${description}`);
      navigation.goBack();
    } catch (error) {
      console.error('Fetch error:', error);
    
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask} activeOpacity={0.7}>
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4295c8',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddTaskScreen;