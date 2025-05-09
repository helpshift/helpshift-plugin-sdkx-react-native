import style from "../style";
import React from "react";
import {TextInput, TextInputProps} from "react-native";

const CustomInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      autoCorrect={false}
      autoCapitalize="none"
      contextMenuHidden={false}
      style={[style.input, props.style]}
    />
  );
};

export default CustomInput;
