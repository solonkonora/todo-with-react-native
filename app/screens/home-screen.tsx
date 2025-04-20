import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { RootStackParamList, todoProps } from '../../nav-types/types';

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
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      fetchTodos();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (todo: todoProps) => {
    navigation.navigate('Add Task', { todo });
  };

  return (
      <View style={styles.container}>
        <Text style={styles.hero}>Available Tasks</Text>
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>

              <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconButton}>
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
          onPress={() => navigation.navigate('Add Task', {})}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#d8ebf7' },
  hero: {     fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
    color: '#333', },

  task: {
    flexDirection: 'row',
    backgroundColor: '#f0f4f8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#63b8ed',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskInfo: { flex: 1, marginRight: 10 },
  taskTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 3 },
  iconRow: { flexDirection: 'row' },
  iconButton: { marginLeft: 15 },
  button: {
    backgroundColor: '#4295c8',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});

export default HomeScreen;
