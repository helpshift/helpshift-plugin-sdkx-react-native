import style from "../style";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

interface ListItemProps {
  title: string;
  onPress: () => void;
}

const ListItem: React.FC<ListItemProps> = ({title, onPress}) => (
  <TouchableOpacity style={style.listItem} onPress={onPress}>
    <Text style={style.listItemText}>{title}</Text>
    <Text style={style.listItemText}>{">"}</Text>
  </TouchableOpacity>
);

const ListSeparator: React.FC = () => <View style={style.separator} />;

export {ListItem, ListSeparator};
