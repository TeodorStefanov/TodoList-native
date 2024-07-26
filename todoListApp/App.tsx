import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/task";

export interface TaskProps {
  title: string;
  id: string;
}
export default function App() {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskItems, setTaskItems] = useState<TaskProps[] | []>([]);
  const [isEdit, setIsEdit] = useState<string>("");

  const handleEditAddTask = () => {
    Keyboard.dismiss();

    if (isEdit) {
      const newTaskItems = taskItems.map((task) => {
        if (task.id === isEdit) {
          return { ...task, title: taskTitle };
        }
        return task; // Return the task unchanged if id does not match
      });

      // Set the updated task items array to the state
      setTaskItems(newTaskItems);
      setTaskTitle("");
      setIsEdit("");
    } else {
      const newTask = { title: taskTitle, id: Date.now().toString() };
      setTaskItems([...taskItems, newTask]);
      setTaskTitle("");
    }
  };

  const handleDeleteTask = (id: string) => {
    let itemsCopy = taskItems.filter((task) => task.id !== id);
    setTaskItems(itemsCopy);
  };

  const handleEditButton = (taskName: string, id: string) => {
    setTaskTitle(taskName);
    setIsEdit(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity>
                <Task
                  title={item.title}
                  id={item.id}
                  handleEdit={handleEditButton}
                  handleDelete={handleDeleteTask}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={taskTitle}
          onChangeText={(text) => setTaskTitle(text)}
        />
        <TouchableOpacity onPress={() => handleEditAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: { paddingTop: 80, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 24, fontWeight: "bold" },
  items: { marginTop: 30 },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
