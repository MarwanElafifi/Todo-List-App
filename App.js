import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Task from './components/Task';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add your login logic here
    // For simplicity, let's just check if both username and password are non-empty
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleAddTask = () => {
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Math.random().toString(),
        title: taskTitle,
        completed: false,
        myDay: false,
        important: false,
        planned: false,
        assignedToMe: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskTitle('');
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleSaveEdit = (taskId, editedTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: editedTitle } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleMoveTask = (taskId, destination) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, [destination]: !task[destination] } : task
    );
    setTasks(updatedTasks);
  };

  const renderTask = ({ item }) => (
    <Task
      task={item}
      onPress={() => handleToggleComplete(item.id)}
      onEdit={() => handleEditTask(item.id)}
      onSaveEdit={(editedTitle) => handleSaveEdit(item.id, editedTitle)}
      onDelete={() => handleDeleteTask(item.id)}
      onMoveMyDay={() => handleMoveTask(item.id, 'myDay')}
      onMoveImportant={() => handleMoveTask(item.id, 'important')}
      onMovePlanned={() => handleMoveTask(item.id, 'planned')}
      onMoveAssigned={() => handleMoveTask(item.id, 'assignedToMe')}
      isEditing={editingTaskId === item.id}
    />
  );

  const filteredTasks = () => {
    switch (selectedIndex) {
      case 1:
        return tasks.filter((task) => task.myDay);
      case 2:
        return tasks.filter((task) => task.important);
      case 3:
        return tasks.filter((task) => task.planned);
      case 4:
        return tasks.filter((task) => task.assignedToMe);
      default:
        return tasks;
    }
  };

  const filters = ['All Tasks', 'My Day', 'Important', 'Planned', 'Assigned'];

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.title}>Hello, {username}!</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Task"
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
          />
          <Button title="Add Task" onPress={handleAddTask} />
          <SegmentedControl
            style={styles.segmentedControl}
            values={filters}
            selectedIndex={selectedIndex}
            onChange={(event) =>
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
            }
          />
          <FlatList
            style={styles.flatList}
            data={filteredTasks()}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>Welcome to ToDo App</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  segmentedControl: {
    marginTop: 10,
  },
  flatList: {
    flex: 1,
    marginTop: 20,
  },
});

export default App;
