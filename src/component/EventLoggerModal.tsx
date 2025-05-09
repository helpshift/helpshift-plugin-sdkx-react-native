import {useAppContext} from "../data/AppContext";
import React from "react";
import {Modal, View, Text, FlatList, TouchableOpacity} from "react-native";
import style from "../style";
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({visible, onClose}) => {
  const {events, clearEvents} = useAppContext();
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={style.modalBackground}>
        <View style={style.modalContainer}>
          <Text style={style.modalTitle}>Helpshift Events</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={style.eventItem}>
                <Text style={style.eventName}>{item.eventName}</Text>
                <Text style={style.eventData}>{JSON.stringify(item.eventData, null, 2)}</Text>
              </View>
            )}
          />

          <View style={style.horizontalContainer}>
            <TouchableOpacity style={style.appButtonContainer} onPress={onClose}>
              <Text style={style.appButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.secondaryButtonContainer} onPress={clearEvents}>
              <Text style={style.secondaryButtonText}>Clear Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
