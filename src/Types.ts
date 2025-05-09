import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  UserLogin: undefined;
  UserIdentity: undefined;
  Config: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface Attributes {
  custom_user_fields?: Record<string, any>;
  [key: string]: any;
}

export interface Identity {
  identifier: string;
  value: string;
  metadata: object;
}

// Define the type for SDK config
export interface SDKConfig {
  [key: string]: any;
}

export interface HelpshiftEvent {
  eventName: string;
  eventData: any;
}
