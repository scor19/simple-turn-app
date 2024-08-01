import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/Styles';
import { editSchema } from '../services/FormValidation';
import InputField from '../components/InputField';
import DatePicker from '../components/DatePicker';
import {
  fetchPatientData,
  updatePatientData,
} from '../services/patientService';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import TurnLoader from '../components/TurnLoader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const UserEdit = ({ route }) => {
  const [patient, setPatient] = useState({});
  const { userId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const loadPatientData = async () => {
      const data = await fetchPatientData(userId);
      if (data) {
        setPatient(data);
        reset(data);
      }
    };
    loadPatientData();
  }, [userId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: patient,
    resolver: yupResolver(editSchema),
  });

  const editPatient = async (data) => {
    try {
      await updatePatientData(patient.id, data);
      Alert.alert(
        'Patient updated successfully',
        'The patient was updated in the database',
        [{ text: 'OK', onPress: handleGoBack }]
      );
    } catch (error) {
      console.error('Error saving the patient', error);
    }
  };

  const onSubmit = (data) => {
    data.appointment = data.appointment || patient.appointment;
    data.accountEmail = patient.accountEmail;
    editPatient(data);
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={[styles.container, { justifyContent: 'center' }]}>
          <View
            style={{
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <AntDesign name="edit" size={96} color="#50bb52" />
            <Text
              style={[
                styles.textTitle,
                { alignSelf: 'center', marginBottom: 10 },
              ]}
            >
              Edit appointment
            </Text>
          </View>
          <InputField
            name="name"
            control={control}
            label="Name"
            placeholder={patient.name || 'Name'}
            errors={errors}
            icon="right"
          />
          <InputField
            name="email"
            control={control}
            label="Email"
            placeholder={patient.email || 'Email (optional)'}
            errors={errors}
            icon="right"
          />
          <InputField
            name="phone"
            control={control}
            label="Phone"
            placeholder={patient.phone || 'Phone number'}
            errors={errors}
            icon="right"
          />
          <DatePicker
            name="appointment"
            control={control}
            label="Appointment date"
            placeholder={patient.appointment || 'Appointment date'}
            errors={errors}
          />
          <InputField
            name="reason"
            control={control}
            label="Reason"
            placeholder={patient.reason || 'Appointment reason'}
            errors={errors}
            icon="right"
          />
          <InputField
            name="record"
            control={control}
            label="Record"
            placeholder={patient.record || 'Record (optional)'}
            errors={errors}
            icon="right"
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[
                styles.inputElevation,
                { backgroundColor: '#50bb52', padding: 10, borderRadius: 15 },
              ]}
            >
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={[
                styles.inputElevation,
                {
                  backgroundColor: '#50bb52',
                  padding: 10,
                  borderRadius: 15,
                  flexDirection: 'row',
                },
              ]}
            >
              <AntDesign
                name="back"
                size={24}
                color="white"
                style={styles.iconLeft}
              />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}
              >
                Go back
              </Text>
            </TouchableOpacity>
          </View>

      </View>
      {/* <TurnLoader /> */}
    </>
  );
};

export default UserEdit;
