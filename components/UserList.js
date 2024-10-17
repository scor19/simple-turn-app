import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import db from '../database/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { styles } from '../styles/Styles';
import Patient from './Patient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import TurnLoader from './TurnLoader';

const UserList = () => {
  const [patients, setPatients] = useState([]);
  const [storageEmail, setStorageEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener el correo electrónico almacenado
  const getEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      console.log('Storage email:', email);
      setStorageEmail(email); // Actualizar el estado del email
      return email;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Función para hacer la consulta a Firestore
    const fetchData = async () => {
      try {
        const email = await getEmail(); // Asegúrate de que `storageEmail` esté actualizado
        if (!email) return; // Si no hay email, salir

        setIsLoading(true); // Iniciar el indicador de carga

        // Reiniciar pacientes cuando el correo electrónico cambia
        setPatients([]);

        const collectionRef = collection(db, 'patient');
        const q = query(collectionRef, where('accountEmail', '==', email));

        // Suscripción a la consulta de Firestore
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedPatients = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            appointment: doc.data().appointment,
            email: doc.data().email,
            name: doc.data().name,
            phone: doc.data().phone,
            reason: doc.data().reason,
            record: doc.data().record,
          }));
          setPatients(fetchedPatients); // Actualizar el estado de los pacientes
          setIsLoading(false); // Detener el indicador de carga
        });

        return () => unsubscribe(); // Limpiar la suscripción
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Detener el indicador de carga en caso de error
      }
    };

    fetchData();
  }, [storageEmail]); // Ejecutar cuando `storageEmail` cambie

  return (
    <ScrollView>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 20,
        }}
      >
        <AntDesign
          name="profile"
          size={40}
          color="#50bb52"
          style={[styles.iconLeft]}
        />
        <Text
          style={[
            styles.textTitle,
            { alignSelf: 'center', marginVertical: 15 },
          ]}
          allowFontScaling={false}
        >
          Appointments
        </Text>
      </View>
      {isLoading && <TurnLoader />}
      {!isLoading && patients.length === 0 && (
        <Text
          style={styles.noAppointments}
        >
          You don't have appointments!
        </Text>
      )}
      {patients.map((patient) => (
        <Patient key={patient.id} {...patient} />
      ))}
    </ScrollView>
  );
};

export default UserList;
