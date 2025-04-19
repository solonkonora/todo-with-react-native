import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, todoProps } from '../../nav-types/types'; // Adjust path

type AddTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'Add Task'>;

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ route, navigation }) => {
  const todo = route.params?.todo;

  const [title, setTitle] = useState(todo?.title ?? '');
  const [description, setDescription] = useState(todo?.description ?? '');

  const API_BASE_URL =
    Platform.OS === 'android'
      ? 'http://192.168.1.36:3000/api/todos'
      : 'http://localhost:3000/api/todos';

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return;
    }

    try {
      const method = todo ? 'PUT' : 'POST';
      const url = todo ? `${API_BASE_URL}/${todo._id}` : API_BASE_URL;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      Alert.alert(todo ? 'Task Updated' : 'Task Added', `Title: ${title}\nDescription: ${description}`);

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
      <TextInput style={styles.input} placeholder="Todo Title" value={title} onChangeText={setTitle} autoFocus />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.7}>
        <Text style={styles.buttonText}>{todo ? 'UPDATE' : 'ADD'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  input: { borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10, borderRadius: 5, fontSize: 16 },
  descriptionInput: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#4295c8', borderRadius: 5, paddingVertical: 12, paddingHorizontal: 20, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default AddTaskScreen;