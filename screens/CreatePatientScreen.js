import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import DatePicker from '../components/DatePicker';
import { saveNewPatient } from '../services/patientService';
import { patientSchema } from '../services/FormValidation';
import { styles } from '../styles/Styles';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const CreatePatientScreen = () => {
  const [storageEmail, setStorageEmail] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(patientSchema),
  });

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        setStorageEmail(email);
      } catch (error) {
        console.error(error);
      }
    };
    getEmail();
  }, []);

  const onSubmit = (data) => {
    const dataToSubmit = {
      ...data,
      accountEmail: storageEmail,
    };
    saveNewPatient(dataToSubmit);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        email: '',
        phone: '',
        appointment: '',
        reason: '',
        record: '',
      });
    }
  }, [formState, reset]);

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
      <View style={[styles.container, { justifyContent: 'center', paddingTop: 50 }]}>
        <View
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <AntDesign name="adduser" size={96} color="#50bb52" />
          <Text
            style={[
              styles.textTitle,
              { alignSelf: 'center', marginBottom: 10 },
            ]}
          >
            Patient
          </Text>
        </View>
        <InputField
          name="name"
          control={control}
          label="Name"
          placeholder="Name"
          errors={errors}
          icon="right"
          style={{ width: '10%' }}
        />
        <InputField
          name="email"
          control={control}
          label="Email (optional)"
          placeholder="Email (optional)"
          errors={errors}
          icon="right"
        />
        <InputField
          name="phone"
          control={control}
          label="Phone number"
          placeholder="Phone number"
          errors={errors}
          icon="right"
        />
        <DatePicker
          name="appointment"
          control={control}
          label="Appointment date"
          placeholder="Select date"
          errors={errors}
        />
        <InputField
          name="reason"
          control={control}
          label="Appointment reason"
          placeholder="Appointment reason"
          errors={errors}
          icon="right"
        />
        <InputField
          name="record"
          control={control}
          label="Record (optional)"
          placeholder="Record (optional)"
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
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreatePatientScreen;
