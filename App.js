import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Task from './Task';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user) => {
    // For simplicity, let's consider login is successful if the username is not empty
    if (user.trim() !== '') {
      setUsername(user);
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
        user: '', // Set the user for tasks assigned to a specific user
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const renderTask = ({ item }) => (
    <Task task={item} onPress={() => handleToggleComplete(item.id)} />
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
        <View>
          <Text style={styles.welcome}>Welcome, {username}!</Text>
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
            onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
          />
          <FlatList
            style={styles.flatList}
            data={filteredTasks()}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 140,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  segmentedControl: {
    marginTop: 20,
  },
  flatList: {
    flex: 1,
    marginTop: 20,
  },
});

export default App;
