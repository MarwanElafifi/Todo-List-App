// Inside your Task component

// ...

const Task = ({ task, onPress, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(false);
    onEdit(editedTitle);
  };

  return (
    <View>
      {/* Display task details */}
      <Text>{task.title}</Text>

      {/* Edit mode */}
      {isEditing && (
        <View>
          <TextInput
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
          />
          <Button title="Save" onPress={handleEdit} />
        </View>
      )}

      {/* Toggle between display and edit mode */}
      <Button title={isEditing ? "Cancel" : "Edit"} onPress={() => setIsEditing(!isEditing)} />

      {/* Other task components... */}
    </View>
  );
};

// ...
