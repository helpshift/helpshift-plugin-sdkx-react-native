import React from "react";
import {ScrollView, View} from "react-native";
import Conversation from "../component/Conversation";
import Helpcenter from "../component/Helpcenter";
import Misc from "../component/Misc";
import UserTrack from "../component/UserTrack";
import Language from "../component/Language";
import {isIos} from "../util";
import AppContainer from "../AppContainer";
import style from "../style";
import {ListItem} from "../component/ListItem";
import {logout} from "helpshift-plugin-sdkx-react-native";
import {useNavigation} from "@react-navigation/native";
import {NavigationProp} from "../Types";
import {useAppContext} from "../data/AppContext";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {sdkConfig} = useAppContext();

  const DATA = [
    {
      id: "1",
      title: "User Login",
      action: () => navigation.navigate("UserLogin")
    },
    {
      id: "2",
      title: "User Identity",
      action: () => navigation.navigate("UserIdentity")
    },
    {
      id: "3",
      title: "Logout",
      action: () => logout()
    },
    {
      id: "4",
      title: "Config",
      action: () => navigation.navigate("Config")
    }
  ];

  return (
    <View style={style.flex}>
      <AppContainer>
        <View style={style.flex}>
          <ScrollView>
            <>
              {DATA.map((item) => {
                return (
                  <View key={item.id} style={style.card}>
                    <ListItem title={item.title} onPress={() => item.action()} />
                  </View>
                );
              })}
            </>
            <Conversation sdkConfig={sdkConfig} />
            <Helpcenter sdkConfig={sdkConfig} />
            <Misc sdkConfig={sdkConfig} />
            <Language />
            <UserTrack />
          </ScrollView>
        </View>
      </AppContainer>
    </View>
  );
};

export default HomeScreen;
