// Inside your App component

// ...

const handleEditTask = (taskId, newTitle) => {
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, title: newTitle } : task
  );
  setTasks(updatedTasks);
};

// ...

const renderTask = ({ item }) => (
  <Task
    task={item}
    onPress={() => handleToggleComplete(item.id)}
    onEdit={(newTitle) => handleEditTask(item.id, newTitle)}
  />
);

// ...

