import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addNewTask = () => {
    tasks.push({
      id: Math.random().toString(16).slice(2),
      task: task,
    });

    setTasks([...tasks]);
    setTask("");
  };

  const removeTask = (itemId) => {
    tasks.splice(
      tasks.findIndex((t) => t.id === itemId),
      1,
    );

    setTasks([...tasks]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title}>ToDo List</Text>

      <View style={styles.newTaskContainer}>
        <TextInput
          style={styles.inputTask}
          placeholder="Enter task"
          onChangeText={(value) => setTask(value)}
          value={task}
        />

        <TouchableOpacity onPress={() => addNewTask()}>
          <FontAwesome name="plus-circle" size={30} color="#299126" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.containerItem}>
            <Text style={styles.text}>{item.task}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <FontAwesome
                style={styles.buttonTrash}
                name="trash"
                size={20}
                color="#d93434"
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 24,
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: "#4a75c7",
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  newTaskContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputTask: {
    flex: 1,
    backgroundColor: "#e6e6e6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  containerItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    paddingVertical: 6,
  },
});
