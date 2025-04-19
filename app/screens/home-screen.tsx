import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type todoProps = {
  _id: string;
  title: string;
  description: string;
};

// Define your stack param list
type RootStackParamList = {
  'Home': undefined;
  'Add Task': undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [todos, setTodos] = useState<todoProps[]>([]);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = async (id: string) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    fetchTodos();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    fetchTodos();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todos</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>

            <Button title="Edit" onPress={() => handleEdit(item._id)} />
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Add Task')}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  task: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskTitle: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4295c8',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
