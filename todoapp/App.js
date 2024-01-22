import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  const addTask = () => {
    if (task.trim() === '') {
      return;
    }

    setTasks([...tasks, { id: tasks.length + 1, text: task }]);
    setTask('');
  };

  const removeTask = (taskId) => {
    const removedTask = tasks.find((t) => t.id === taskId);
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    setDeletedTasks([...deletedTasks, removedTask]);
  };

  const completeTask = (taskId) => {
    const completedTask = tasks.find((t) => t.id === taskId);
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const toggleCompletedView = () => {
    setShowCompleted(!showCompleted);
    setShowDeleted(false);
  };

  const toggleDeletedView = () => {
    setShowDeleted(!showDeleted);
    setShowCompleted(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#3498db' }}>
      <Text style={{ textAlign: 'center', fontSize: 24, color: 'white', marginBottom: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Todo App</Text>

      <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 10, borderRadius: 6, marginBottom: 10 }}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontStyle: 'italic'}}>Tareas Totales: {tasks.length}</Text>
      </View>

      {showCompleted && (
        <ScrollView style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 10, borderRadius: 6, marginBottom: 10,  color: 'black', fontWeight: 'bold', fontStyle: 'italic' }}>
          <Text style={{ color: 'black', fontSize: 16 , fontWeight: 'bold', fontStyle: 'italic'}}>Tareas Completadas: {completedTasks.length}</Text>
          <FlatList
            data={completedTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <ListItem
                containerStyle={{ backgroundColor: 'transparent' }}
                bottomDivider
                style={{ marginBottom: 16 }}
              >
                <ListItem.Content>
                  <ListItem.Title style={{ color: 'black', fontWeight: 'bold', fontStyle: 'italic'}}>{`${index + 1}. ${item.text}`}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </ScrollView>
      )}

      {showDeleted && (
        <ScrollView style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 10, borderRadius: 6, marginBottom: 10 }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' }}>Tareas Eliminadas: {deletedTasks.length}</Text>
          <FlatList
            data={deletedTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <ListItem
                containerStyle={{ backgroundColor: 'transparent'}}
                bottomDivider
                style={{ marginBottom: 16 }}
              >
                <ListItem.Content>
                  <ListItem.Title style={{ color: 'black', fontWeight: 'bold', fontStyle: 'italic' }}>{`${index + 1}. ${item.text}`}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </ScrollView>
      )}

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'white', borderWidth: 1, marginRight: 10, padding: 10, color: 'white', fontWeight: 'bold', fontStyle: 'italic', borderRadius: 6}}
          placeholder="Nueva tarea"
          placeholderTextColor="white"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 10, borderRadius: 6, color: 'black'}}
          onPress={addTask}
        >
          <Text style={{ color: 'black', fontWeight: 'bold', fontStyle: 'italic' }}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 10, borderRadius: 6, flex: 1, marginRight: 5 }}
          onPress={toggleCompletedView}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic' }}>Ver Completadas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'firebrick', padding: 10, borderRadius: 6, flex: 1, marginLeft: 5 }}
          onPress={toggleDeletedView}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic' }}>Ver Eliminadas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'white' }}
            bottomDivider
            style={{ marginBottom: 16 }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>{`${index + 1}. ${item.text}`}</ListItem.Title>
            </ListItem.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => completeTask(item.id)}
              >
                <Icon
                  name="check"
                  type="material"
                  color="green"
                />
              </TouchableOpacity>
              <Icon
                name="delete"
                type="material"
                color="red"
                onPress={() => removeTask(item.id)}
              />
            </View>
          </ListItem>
        )}
      />
    </View>
  );
};

export default App;
