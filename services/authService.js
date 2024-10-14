import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '../database/firebase';

const auth = FIREBASE_AUTH;
export const signIn = async (data) => {
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log(res);
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/invalid-login-credentials') {
      Alert.alert('Sign in failed:', 'Incorrect email or password');
    } else if (error.code === 'auth/too-many-requests') {
      Alert.alert('Sign in failed:', 'Too many requests, try again later');
    }
  }
};

export const saveEmail = async (data) => {
  try {
    await AsyncStorage.setItem('email', data.email);
    console.log('Email saved at login:', data.email);
  } catch (error) {
    console.log(error);
  }
};

export const resetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent: ', email);
  } catch (error) {
    console.log(error);
  }
}