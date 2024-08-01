import { getDoc, addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import db from '../database/firebase';
import { Alert } from 'react-native';

export const saveNewPatient = async (dataToSubmit) => {
  try {
    await addDoc(collection(db, 'patient'), dataToSubmit);
    Alert.alert(
      'Patient added successfully',
      'The patient was saved in the database',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  } catch (error) {
    console.error('Error saving the patient', error);
  }
};

export const updatePatientData = async (patientId, dataToSubmit) => {
  try {
    await updateDoc(doc(db, 'patient', patientId), dataToSubmit);
  } catch (error) {
    console.error('Error guardando los datos del paciente', error);
    throw error;
  }
};

export const fetchPatientData = async (userId) => {
  const patientRef = doc(db, 'patient', userId);
  try {
    const docSnapshot = await getDoc(patientRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log('El paciente no existe en la base de datos.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener los datos del paciente', error);
    throw error;
  }
};
