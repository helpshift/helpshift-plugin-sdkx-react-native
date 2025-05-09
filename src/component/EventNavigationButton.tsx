import {useAppContext} from "../data/AppContext";
import styles from "../style";
import React from "react";
import {Text, TouchableOpacity} from "react-native";

const TopRightButton = () => {
  const {setEventModalPresented} = useAppContext();

  return (
    <TouchableOpacity onPress={() => setEventModalPresented(true)}>
      <Text style={styles.listItemText}> Events</Text>
    </TouchableOpacity>
  );
};
export default TopRightButton;
