import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as React from "react";
import HomeScreen from "./screens/HomeScreen";
import UserIdentityLoginScreen from "./screens/UserIdentityLoginScreen";
import UserLoginScreen from "./screens/UserLoginScreen";
import ConfigScreen from "./screens/ConfigScreen";
import TopRightButton from "./component/EventNavigationButton";

const Stack = createNativeStackNavigator();

const RootNavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <TopRightButton />,
        headerTitleAlign: "center",
        headerBackTitle: "Back"
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" options={{title: "Helpshift Demo"}} component={HomeScreen} />
      <Stack.Screen name="UserLogin" options={{title: "User Login"}} component={UserLoginScreen} />
      <Stack.Screen
        name="UserIdentity"
        options={{title: "User Identity"}}
        component={UserIdentityLoginScreen}
      />
      <Stack.Screen name="Config" options={{title: "Config"}} component={ConfigScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigationStack;
