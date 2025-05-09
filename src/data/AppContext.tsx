import {HelpshiftEvent, SDKConfig} from "../Types";
import {DEFAULT_CONFIG} from "../util";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

// Define the context value type
interface AppContextType {
  sdkConfig: SDKConfig;
  setSDKConfig: Dispatch<SetStateAction<SDKConfig>>;
  events: HelpshiftEvent[];
  // eslint-disable-next-line no-unused-vars
  addEvent: (event: HelpshiftEvent) => void;
  eventModalPresented: boolean;
  setEventModalPresented: Dispatch<SetStateAction<boolean>>;
  clearEvents: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Create context
export const AppProvider = ({children}: {children: ReactNode}) => {
  // State for SDK configuration
  const [sdkConfig, setSDKConfig] = useState<Record<string, any>>(DEFAULT_CONFIG);

  // State for Helpshift events
  const [events, setEvents] = useState<HelpshiftEvent[]>([]);

  // State for Helpshift Modal
  const [eventModalPresented, setEventModalPresented] = React.useState(false);

  // Function to add a new event
  const addEvent = (event: HelpshiftEvent) => {
    setEvents((prevEvents) => [event, ...prevEvents].slice(-30)); // Keep only last 30 events
  };

  const clearEvents = () => {
    setEvents([]); // Reset the events array
  };

  return (
    <AppContext.Provider
      value={{
        sdkConfig,
        setSDKConfig,
        events,
        addEvent,
        eventModalPresented,
        setEventModalPresented,
        clearEvents
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
