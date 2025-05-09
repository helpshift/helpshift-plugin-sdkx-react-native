import React, {ReactNode} from "react";
import {SafeAreaView, View, KeyboardAvoidingView} from "react-native";
import Toast from "react-native-toast-message";
import style from "./style";
import {isIos, KEYBOARD_VERTICAL_OFFSET} from "./util";

type AppContainerProps = {
  children: ReactNode;
};

const AppContainer: React.FC<AppContainerProps> = ({children}) => {
  return (
    <View style={style.flex}>
      <SafeAreaView style={style.flex}>
        <KeyboardAvoidingView
          style={style.flex}
          behavior={isIos ? "padding" : "height"}
          keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}>
          <View style={style.flex}>{children}</View>
        </KeyboardAvoidingView>
        <Toast topOffset={0} />
      </SafeAreaView>
    </View>
  );
};

export default AppContainer;
