import { View, Text, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles/Styles';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, deleteDoc } from 'firebase/firestore';
import db from '../database/firebase';
import Collapsible from 'react-native-collapsible';

const Patient = ({ id, appointment, email, name, phone, reason, record }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    console.log('Handle delete');
    try {
      await deleteDoc(doc(db, 'patient', id));
      Alert.alert('Deleted', 'The appointment was deleted');
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to delete: ', error.message);
    }
  };
  const handleEditPress = () => {
    // Navega a la pantalla de edición
    navigation.navigate('UserEdit', { userId: id });
  };

  return (
    <View
      style={[
        styles.elevation,
        styles.patientList,
        { flex: 1, marginHorizontal: 20 },
      ]}
    >
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View
          style={[
            styles.elevation,
            {
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <AntDesign
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 10, marginTop: 5 }}
            />
            <Text style={[styles.patientName]} allowFontScaling={false}>{name}</Text>
          </View>
          <AntDesign
            name={expanded ? 'down' : 'left'}
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
        <View style={{ marginTop: 5, marginBottom: 10 }}>
          {expanded ? null : <Text style={styles.patientDetail}>{reason}</Text>}
          <Collapsible collapsed={!expanded}>
            <Text style={styles.patientDetail}>{email}</Text>
            <Text style={styles.patientDetail}>{phone}</Text>
            <Text style={styles.patientDetail}>{reason}</Text>
            <Text style={styles.patientDetail}>{record}</Text>
          </Collapsible>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <AntDesign
              name="calendar"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.patientName]} allowFontScaling={false}>
              {appointment}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Delete', 'Are you sure?', [
                  { text: 'OK', onPress: () => handleDelete() },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                  },
                ])
              }
            >
              <AntDesign
                name="delete"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditPress}>
              <AntDesign
                name="edit"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Patient;
