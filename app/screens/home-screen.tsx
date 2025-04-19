import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type todoProps = {
  _id: string;
  title: string;
  description: string;
};

type RootStackParamList = {
  Home: undefined;
  'Add Task': undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [todos, setTodos] = useState<todoProps[]>([]);

  const API_BASE_URL = Platform.OS === 'android' ? 'http://192.168.1.36:3000' : 'http://localhost:3000';

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      fetchTodos();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };



  
  const handleEdit = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'EDIT',
      });
      if (!response.ok) throw new Error('Failed to delete');
      fetchTodos();
    } catch (error) {
      console.error('Delete error:', error);
    }
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

            <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => handleEdit(item._id)} style={styles.iconButton}>
          <MaterialIcons name="edit" size={24} color="#4295c8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.iconButton}>
          <MaterialIcons name="delete" size={24} color="#c44242" />
        </TouchableOpacity>
      </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Add Task')}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  header: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  task: { backgroundColor: '#fff', padding: 15, borderRadius: 5, marginBottom: 10 },
  taskTitle: { fontWeight: 'bold' },
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
    fontWeight: '600' 
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconButton: {
    marginRight: 20,
  },
});

export default HomeScreen;
