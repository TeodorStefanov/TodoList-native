import { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
  title: string;
  id: string;
  handleEdit: (title: string, id: string) => void;
  handleDelete: (id: string) => void;
}

const Task: FC<Props> = ({ title, id, handleEdit, handleDelete }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity onPress={() => handleEdit(title, id)}>
          <IconButton icon="pencil" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconButton icon="delete" onPress={() => handleDelete(id)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },

  itemText: {
    maxWidth: "80%",
  },

  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default Task;
