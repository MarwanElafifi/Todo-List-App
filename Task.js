// Task.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Task = ({ task, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{task.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 4,
    borderRadius: 40,
    marginBottom: 100,
  },
  taskText: {
    fontSize: 25,
  },
});

export default Task;
